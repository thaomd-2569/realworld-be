
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ListResponseDto } from './list-response.dto';
import { Profile } from 'src/entities/profile.entity';
import { ProfileResponseDto } from 'src/modules/profiles/dto/profile-response.dto';

@Injectable()
export class ProfileConverter {
    /**
     * Convert single Profile entity to ProfileResponseDto
     */
    toDto(profile: Profile | null | undefined, currentUserId?: number): ProfileResponseDto | null {
        if (!profile) {
            return null;
        }

        // Convert using class-transformer
        const dto = plainToInstance(ProfileResponseDto, profile, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });

        // Set default following status
        dto.following = false;

        // Calculate following status if currentUserId is provided
        if (currentUserId && profile.followers) {
            dto.following = profile.followers.some(follower =>
                follower.user?.id === currentUserId
            );
        } else if (currentUserId) {
            // If currentUserId exists but no followers loaded, default to false
            dto.following = false;
        }

        return dto;
    }

    /**
     * Convert array - Approach 1: Simple array
     */
    toDtoArray(profiles: Profile[], currentUserId?: number): ProfileResponseDto[] {
        return profiles.map(profile => this.toDto(profile, currentUserId)).filter(Boolean) as ProfileResponseDto[];
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
        profiles: Profile[],
        pagination?: { total: number; page: number; limit: number },
        filters?: Record<string, any>
    ): ListResponseDto<ProfileResponseDto> {
        const dtoArray = this.toDtoArray(profiles);
        return new ListResponseDto(dtoArray, pagination, filters);
    }
}
