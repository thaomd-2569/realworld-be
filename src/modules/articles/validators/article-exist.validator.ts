import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Article } from 'src/entities/article.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ArticleExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const article = await this.articleRepository.findOne({
      where: { slug: value },
    });

    return !!article;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Article with slug does not exist in database';
  }
}
