import { registerDecorator, ValidationOptions } from 'class-validator';
import { TagsExistConstraint } from '../validators/tag-exist.validator';

export function IsTagsExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: TagsExistConstraint,
    });
  };
}
