import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileConverter } from 'src/converters/profile-converter';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UsersModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileConverter, JwtService],
})
export class ProfilesModule {}
