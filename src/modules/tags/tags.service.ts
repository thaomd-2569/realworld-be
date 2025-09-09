import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(dto: object): Promise<Tag> {
    const tag = this.tagRepository.create(dto);
    return await this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async clearAll(): Promise<void> {
    await this.tagRepository.clear();
  }
}
