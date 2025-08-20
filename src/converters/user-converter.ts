
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { User } from '../entities/user.entity';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { ListResponseDto } from './list-response.dto';

@Injectable()
export class UserConverter {
    /**
     * Convert single User entity to UserResponseDto
     */
    toDto(user: User | null | undefined): UserResponseDto {
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });
    }

    /**
     * Convert array - Approach 1: Simple array
     */
    toDtoArray(users: User[]): UserResponseDto[] {
        return users.map(user => this.toDto(user));
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
        users: User[],
        pagination?: { total: number; page: number; limit: number },
        filters?: Record<string, any>
    ): ListResponseDto<UserResponseDto> {
        const dtoArray = this.toDtoArray(users);
        return new ListResponseDto(dtoArray, pagination, filters);
    }
}
