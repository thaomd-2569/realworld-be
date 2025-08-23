import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    user_name: string;

    @Expose()
    bio: string;

    @Expose()
    image: string;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;
}
