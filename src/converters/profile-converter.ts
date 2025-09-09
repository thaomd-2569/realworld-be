import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { ListResponseDto } from './list-response.dto';
import { Profile } from 'src/entities';
import { ProfileResponseDto } from 'src/modules/profiles/dto/profile-response.dto';
import { Converter } from './converter';

@Injectable()
export class ProfileConverter
  implements Converter<Profile, ProfileResponseDto>
{
  /**
   * Convert single Profile entity to ProfileResponseDto
   */
  toDto(
    profile: Profile | null | undefined,
    currentUserId?: number,
  ): ProfileResponseDto {
    const dto = plainToInstance(ProfileResponseDto, profile, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    dto.following = false;

    // Convert nested user entity to UserResponseDto
    if (profile?.user) {
      dto.user = plainToInstance(UserResponseDto, profile.user, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
    }

    // Set following status based on current user
    if (currentUserId && profile) {
      dto.following =
        profile.followers?.some(
          (follower) => follower.user.id === currentUserId,
        ) || false;
    }

    return dto;
  }

  /**
   * Convert array - Approach 1: Simple array
   */
  toDtoArray(profiles: Profile[]): ProfileResponseDto[] {
    return profiles.map((profile) => this.toDto(profile));
  }

  /**
   * Convert array - Approach 4: Generic list response
   */
  // toGenericListResponse(profiles: Profile[]): ProfileResponseDto[] {
  //   return this.toDtoArray(profiles);
  // }

  /**
   * Convert array to wrapper with metadata
   */
  toGenericListResponse(
    profiles: Profile[],
    pagination?: { total: number; page: number; perPage: number },
    filters?: Record<string, any>,
  ): ListResponseDto<ProfileResponseDto> {
    const dtoArray = this.toDtoArray(profiles);
    return new ListResponseDto(dtoArray, pagination, filters);
  }
}
