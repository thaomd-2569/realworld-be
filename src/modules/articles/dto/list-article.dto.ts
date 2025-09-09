import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ListArticleDto {
  @IsOptional()
  @IsString()
  tag: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  favorited: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  per_page: number = 20;
}
