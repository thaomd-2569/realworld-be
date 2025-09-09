import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { ListArticleDto } from './dto/list-article.dto';
import { ArticleConverter } from 'src/converters/article-converter.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articleConverter: ArticleConverter,
  ) {}

  @Get()
  async findAll(@Query() query: ListArticleDto) {
    const articles = await this.articlesService.findAll(query);
    return articles;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(createArticleDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':slug')
  async update(@Req() req: any, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.update(updateArticleDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  async delete(@Req() req: any, @Body() deleteArticleDto: DeleteArticleDto) {
    return await this.articlesService.delete(deleteArticleDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':slug/favorite')
  async favorite(@Req() req: any) {
    return await this.articlesService.favorite(req.params.slug, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':slug/unfavorite')
  async unfavorite(@Req() req: any) {
    return await this.articlesService.unfavorite(req.params.slug, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':slug/comments')
  async addComment(@Req() req: any, @Body() commentDto: AddCommentDto) {
    return await this.articlesService.addComment(
      req.params.slug,
      req.user,
      commentDto,
    );
  }

  @Get(':slug/comments')
  async getComments(@Req() req: any) {
    return await this.articlesService.getComments(req.params.slug);
  }
}
