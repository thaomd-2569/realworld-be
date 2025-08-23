import { Expose, Transform } from 'class-transformer';

export class ProfileResponseDto {
    @Transform(({ obj }) => obj.user?.user_name, { toClassOnly: true })
    @Expose()
    username: string;

    @Transform(({ obj }) => obj.user?.bio || '', { toClassOnly: true })
    @Expose()
    bio: string;

    @Transform(({ obj }) => obj.user?.image || null, { toClassOnly: true })
    @Expose()
    image: string | null;

    @Expose()
    following: boolean = false;

    // Optional: Internal fields for debugging (remove in production)
    @Expose()
    id: number;

    @Transform(({ obj }) => obj.user_id, { toClassOnly: true })
    @Expose()
    userId: number;
}
