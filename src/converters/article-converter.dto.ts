import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { User } from '../entities/user.entity';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { ListResponseDto } from './list-response.dto';
import { Article } from 'src/entities/article.entity';
import { ArticleResponseDto } from 'src/modules/articles/dto/article-response.dto';
import { Converter } from './converter';

@Injectable()
export class ArticleConverter
  implements Converter<Article, ArticleResponseDto>
{
  /**
   * Convert single Article entity to ArticleResponseDto
   */
  toDto(article: Article | null | undefined): ArticleResponseDto {
    return plainToInstance(ArticleResponseDto, article, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }

  /**
   * Convert array - Approach 1: Simple array
   */
  toDtoArray(articles: Article[]): ArticleResponseDto[] {
    return articles.map((article) => this.toDto(article));
  }

  // /**
  //  * Convert array - Approach 2: Wrapper with metadata
  //  */
  // toListWrapper(
  //     users: User[],
  //     total: number,
  //     page?: number,
  //     limit?: number
  // ): UserListWrapperDto {
  //     const dtoArray = this.toDtoArray(users);
  //     return new UserListWrapperDto(dtoArray, total, page, limit);
  // }

  // /**
  //  * Convert array - Approach 3: Reduced fields for list
  //  */
  // toListItemArray(users: User[]): UserListItemDto[] {
  //     return users.map(user =>
  //         plainToInstance(UserListItemDto, user, {
  //             excludeExtraneousValues: true,
  //             enableImplicitConversion: true,
  //         })
  //     );
  // }

  /**
   * Convert array - Approach 4: Generic list response
   */
  toGenericListResponse(
    articles: Article[],
    pagination?: { total: number; page: number; perPage: number },
    filters?: Record<string, any>,
  ): ListResponseDto<ArticleResponseDto> {
    const dtoArray = this.toDtoArray(articles);
    return new ListResponseDto(dtoArray, pagination, filters);
  }
}
