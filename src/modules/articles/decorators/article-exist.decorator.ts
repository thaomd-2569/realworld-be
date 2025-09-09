import { registerDecorator, ValidationOptions } from 'class-validator';
import { ArticleExistConstraint } from '../validators/article-exist.validator';

export function IsArticleExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ArticleExistConstraint,
    });
  };
}
