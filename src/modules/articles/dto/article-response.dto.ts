import { Expose, Transform } from 'class-transformer';
import { ProfileResponseDto } from 'src/modules/profiles/dto/profile-response.dto';

export class ArticleResponseDto {
  @Expose()
  slug: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  body: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  author: ProfileResponseDto;

  @Expose()
  tags: string[];

  @Expose()
  favorited: boolean;

  @Expose()
  favorites_count: number;
}
