import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../../entities/user.entity';
import { IsEmailUniqueConstraint } from './validators/is-email-unique.validator';
import { UserConverter } from 'src/converters/user-converter';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, IsEmailUniqueConstraint, UserConverter, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
