import { Expose, Transform } from 'class-transformer';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';

export class ProfileResponseDto {
    @Expose()
    user: UserResponseDto;

    @Expose()
    following: boolean;
}
