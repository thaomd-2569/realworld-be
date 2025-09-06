import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { User } from '../../../entities/user.entity';

@ValidatorConstraint({ name: 'IsEmailUniqueConstraint', async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(email: string): Promise<boolean> {
    if (!email) return true; // Skip validation if email is empty

    const user = await this.userRepository.findOne({
      where: { email },
    });

    return !user; // Return true if user doesn't exist (email is unique)
  }

  defaultMessage(): string {
    return 'Email already exists';
  }
}
