import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.manager.transaction(async (entityManager) => {
      const existingUser = await entityManager.findOne(User, { where: { email: createUserDto.email } });
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const password = await bcrypt.hash(createUserDto.password, 10);
      const user = entityManager.create(User, { ...createUserDto, password });

      await entityManager.save(User, user);

      const profile = entityManager.create('Profile', { user });
      await entityManager.save('Profile', profile);

      return user;
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) : Promise<User | null>  {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.usersRepository.update(id, updateUserDto);
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
}
