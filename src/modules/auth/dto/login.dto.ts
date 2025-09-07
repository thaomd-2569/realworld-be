import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({}, { message: 'Password must be strong' })
  @MaxLength(15, { message: 'Password must be at most 15 characters long' })
  password: string;
}
