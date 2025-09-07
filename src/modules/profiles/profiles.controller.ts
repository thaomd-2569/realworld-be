import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileConverter } from 'src/converters/profile-converter';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { OptionalAuthGuard } from '../auth/optional-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly profileConverter: ProfileConverter,
  ) {}

  @Get(':slugName')
  @ApiBearerAuth()
  @UseGuards(OptionalAuthGuard)
  async getProfile(
    @Param('slugName') slugName: string,
    @Request() req,
  ): Promise<ProfileResponseDto> {
    const profile = await this.profilesService.getProfile(slugName);

    return this.profileConverter.toDto(profile, req.user?.id);
  }

  @Post(':slugName/follow')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async follow(
    @Param('slugName') slugName: string,
    @Request() req,
  ): Promise<{ status: string }> {
    await this.profilesService.followProfile(
      req.user.id,
      slugName,
    );

    return { status: 'success' };
  }

  @Delete(':slugName/unfollow')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async unfollow(
    @Param('slugName') slugName: string,
    @Request() req,
  ): Promise<{ status: string }> {
    await this.profilesService.unfollowProfile(
      req.user.id,
      slugName,
    );

    return { status: 'success' };
  }
}
