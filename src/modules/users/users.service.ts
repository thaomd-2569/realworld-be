import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile, User } from 'src/entities';
import * as bcrypt from 'bcrypt';
import slug from 'slug';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.manager.transaction(async (manager) => {
      const password = await bcrypt.hash(createUserDto.password, 10);
      const slugName = slug(createUserDto.user_name, { lower: true });
      const user = manager.create(User, {
        ...createUserDto,
        password,
        slug: slugName,
      });
      const savedUser = await manager.save(user);

      const profile = manager.create(Profile, { user: savedUser });
      await manager.save(profile);

      return savedUser;
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.save({ id, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async clearAll(): Promise<void> {
    await this.usersRepository.query(
      `TRUNCATE TABLE users RESTART IDENTITY CASCADE;`,
    );
  }
}
