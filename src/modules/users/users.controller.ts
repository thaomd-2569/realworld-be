import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserConverter } from 'src/converters/user-converter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiHeader, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userConverter: UserConverter,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return this.userConverter.toDto(user);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return this.userConverter.toDtoArray(users);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile with enhanced error handling' })
  async getUserProfile(@Request() req): Promise<UserResponseDto> {
    try {
      const foundUser = await this.usersService.findOne(req.user.id);
      return this.userConverter.toDto(foundUser);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userConverter.toDto(user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ status: string }> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.usersService.update(id, updateUserDto);

    return { status: 'success' };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ status: string }> {
    await this.usersService.remove(id);
    return { status: 'success' };
  }
}
