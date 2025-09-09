import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Tag } from 'src/entities';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class TagsExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async validate(value: number[], args: ValidationArguments): Promise<boolean> {
    if (!Array.isArray(value) || value.length === 0) {
      return true; // handled by @IsOptional or @IsArray
    }

    const count = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.id IN (:...ids)', { ids: value })
      .getCount();

    return count === value.length;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Some tags do not exist in database';
  }
}
