import { IsString, IsNotEmpty } from 'class-validator';

export class FollowProfileDto {
    @IsNotEmpty()
    @IsString()
    slug_name: string;
}
