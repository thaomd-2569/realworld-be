import { Controller, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { ProfileConverter } from 'src/converters/profile-converter';
import { log } from 'console';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService, private readonly profileConverter: ProfileConverter) {}

  @Get(':user_name')
  async getProfile(@Param('user_name') user_name: string): Promise<ProfileResponseDto | null> {
    const profile = await this.profilesService.findByUserName(user_name);

    if (!profile) {
      log('Profile found:', profile);
      return null;
    }

    log('Profile found:', profile);

    // TODO: Get current user ID from JWT token for following status
    // const currentUserId = req.user?.id;
    return this.profileConverter.toDto(profile);
  }
}
