import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    user_name: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsString()
    image: string;

}
