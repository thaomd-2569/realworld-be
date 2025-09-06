import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { IsEmailUnique } from '../decorators/is-email-unique.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsEmailUnique({ message: 'Email already exists' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Username must be at most 50 characters long' })
  user_name: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({}, { message: 'Password must be strong' })
  @MaxLength(8, { message: 'Password must be at most 8 characters long' })
  password: string;
}
