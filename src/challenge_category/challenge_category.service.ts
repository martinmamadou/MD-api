import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeCategoryDto } from './dto/create-challenge_category.dto';
import { UpdateChallengeCategoryDto } from './dto/update-challenge_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeCategory } from './entities/challenge_category.entity';
import { Challenge } from 'src/challenge/entities/challenge.entity';

@Injectable()
export class ChallengeCategoryService {
  constructor(
    @InjectRepository(ChallengeCategory)
    private categoryRepository: Repository<ChallengeCategory>,
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>
  ) { }
  async create(createChallengeCategoryDto: CreateChallengeCategoryDto) {
    return await this.categoryRepository.save(createChallengeCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } })
    if (!category) throw new NotFoundException('Challenge category not found');
    return category;
  }

  async update(id: number, updateChallengeCategoryDto: UpdateChallengeCategoryDto) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Challenge category not found');
    return await this.categoryRepository.update(id, updateChallengeCategoryDto);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Challenge category not found');
    return await this.categoryRepository.delete(id);
  }

}
