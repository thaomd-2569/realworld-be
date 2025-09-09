import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { IsTagsExist } from '../decorators/tag-exist.decorator';
import { IsArticleExist } from '../decorators/article-exist.decorator';

export class UpdateArticleDto {
  @IsNotEmpty()
  @IsString()
  @IsArticleExist({ message: 'Article with given slug does not exist' })
  slug: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsTagsExist({ message: 'Each tag id must exist in tags table' })
  tags: number[] = [];
}
