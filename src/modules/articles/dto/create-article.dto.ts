import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { IsTagsExist } from '../decorators/tag-exist.decorator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsTagsExist({ message: 'Each tag id must exist in tags table' })
  tags: number[] = [];
}
