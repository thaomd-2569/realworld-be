import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { TagsExistConstraint } from './validators/tag-exist.validator';
import { Tag } from 'src/entities';
import { ArticleExistConstraint } from './validators/article-exist.validator';
import { ArticleConverter } from 'src/converters/article-converter.dto';
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, Comment]), UsersModule],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    JwtService,
    TagsExistConstraint,
    ArticleExistConstraint,
    ArticleConverter,
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
