import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { In, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { User, Tag } from 'src/entities';
import slug from 'slug';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { ListArticleDto } from './dto/list-article.dto';
import { PaginationDto, PaginationMetaDto } from 'src/converters/paginate.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articlesRepository: Repository<Article>,
        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>,
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ) { }

    async findAll(dto: ListArticleDto): Promise<PaginationDto<Article>> {
        const queryBuilder = this.articlesRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.author', 'author')
            .leftJoinAndSelect('author.user', 'user')
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.favoritedBy', 'favoritedBy')
            .orderBy('article.created_at', 'DESC')
            .skip((dto.page - 1) * dto.per_page)
            .take(dto.per_page);

        if (dto.author) {
            queryBuilder.where('user.slug = :slug', { slug: dto.author });
        }

        if (dto.tag) {
            queryBuilder.andWhere('tags.name = :tag', { tag: dto.tag });
        }

        const [articles, count] = await queryBuilder.getManyAndCount();
        const meta = new PaginationMetaDto(dto.page, count, dto.per_page);

        return new PaginationDto<Article>(articles, meta);
    }

    async create(createArticleDto: CreateArticleDto, user: User): Promise<any> {
        const slugName = slug(createArticleDto.title, { lower: true });
        const { tags, ...articleData } = createArticleDto;
        const article = this.articlesRepository.create(articleData);
        if (tags && tags.length > 0) {
            const tagEntities = await this.tagsRepository
                .createQueryBuilder('tag')
                .where('tag.id IN (:...ids)', { ids: tags })
                .getMany();
            article.tags = tagEntities;
        }
        article.slug = slugName;
        article.author = user.profile;

        await this.articlesRepository.save(article);
        return { message: 'Article created', data: article };
    }

    async update(
        updateArticleDto: UpdateArticleDto,
        currentUser: User,
    ): Promise<any> {
        const { tags, slug: dtoSlug, ...articleData } = updateArticleDto;

        const article = await this.findOneBySlug(dtoSlug);

        if (!article) {
            throw new Error('Article not found');
        }

        if (article?.author.id !== currentUser.profile.id) {
            throw new Error('You are not authorized to update this article');
        }

        // Handle tags
        if (Array.isArray(tags) && tags.length > 0) {
            const tagEntities = await this.tagsRepository.findBy({ id: In(tags) });
            article.tags = tagEntities;
        }

        // Handle title + slug
        if (articleData.title && articleData.title !== article.title) {
            article.title = articleData.title;
            article.slug = slug(articleData.title, { lower: true });
        }

        // Update other fields (skip undefined values)
        Object.entries(articleData).forEach(([key, value]) => {
            if (value !== undefined && key !== 'title') {
                (article as any)[key] = value;
            }
        });

        const savedArticle = await this.articlesRepository.save(article);

        return {
            message: 'Article updated',
            data: savedArticle,
        };
    }

    async delete(
        deleteArticleDto: DeleteArticleDto,
        currentUser: User,
    ): Promise<any> {
        const { slug: dtoSlug } = deleteArticleDto;

        const article = await this.findOneBySlug(dtoSlug);

        if (!article) {
            throw new Error('Article not found');
        }

        this.ensureOwnership(article, currentUser);

        await this.articlesRepository.remove(article);

        return { message: 'Article deleted' };
    }

    private async findOneBySlug(slug: string): Promise<Article | null> {
        return await this.articlesRepository.findOne({
            where: { slug },
            relations: ['author', 'tags', 'favoritedBy'],
        });
    }

    private ensureOwnership(article: Article, currentUser: User): void {
        if (article.author.id !== currentUser.profile.id) {
            throw new Error('You are not authorized to perform this action');
        }
    }

    async favorite(slug: string, currentUser: User): Promise<any> {
        const article = await this.findOneBySlug(slug);

        if (!article) {
            throw new Error('Article not found');
        }

        if (
            article.favoritedBy.some(
                (profile) => profile.id === currentUser.profile.id,
            )
        ) {
            throw new Error('You have already favorited this article');
        }

        article.favoritedBy.push(currentUser.profile);
        await this.articlesRepository.save(article);

        return { message: 'Article favorited' };
    }

    async unfavorite(slug: string, currentUser: User): Promise<any> {
        const article = await this.findOneBySlug(slug);

        if (!article) {
            throw new Error('Article not found');
        }

        const index = article.favoritedBy.findIndex(
            (profile) => profile.id === currentUser.profile.id,
        );
        if (index === -1) {
            throw new Error('You have not favorited this article');
        }

        article.favoritedBy.splice(index, 1);
        await this.articlesRepository.save(article);

        return { message: 'Article unfavorited' };
    }

    async addComment(
        slug: string,
        currentUser: User,
        commentDto: AddCommentDto,
    ): Promise<any> {
        const article = await this.findOneBySlug(slug);

        if (!article) {
            throw new Error('Article not found');
        }

        const comment = this.commentsRepository.create({
            body: commentDto.body,
            article,
            author: currentUser.profile,
        });
        await this.commentsRepository.save(comment);

        return { message: 'Comment added' };
    }

    async getComments(slug: string): Promise<any> {
        return await this.commentsRepository.find({
            where: { article: { slug } },
            relations: ['author', 'author.user'],
        });
    }
}
