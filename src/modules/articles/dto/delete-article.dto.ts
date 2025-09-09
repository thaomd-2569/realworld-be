import { IsString, IsNotEmpty } from 'class-validator';
import { IsArticleExist } from '../decorators/article-exist.decorator';

export class DeleteArticleDto {
  @IsNotEmpty()
  @IsString()
  @IsArticleExist({ message: 'Article with given slug does not exist' })
  slug: string;
}
