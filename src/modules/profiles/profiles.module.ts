import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { ProfileConverter } from 'src/converters/profile-converter';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]),],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileConverter],
})
export class ProfilesModule {}
