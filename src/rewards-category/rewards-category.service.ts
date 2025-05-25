import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRewardsCategoryDto } from './dto/create-rewards-category.dto';
import { UpdateRewardsCategoryDto } from './dto/update-rewards-category.dto';
import { Repository } from 'typeorm';
import { RewardsCategory } from './entities/rewards-category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RewardsCategoryService {
  constructor(
    @InjectRepository(RewardsCategory)
    private rewardsCategoryRepository: Repository<RewardsCategory>
  ) {}
  async create(createRewardsCategoryDto: CreateRewardsCategoryDto) {
    return await this.rewardsCategoryRepository.save(createRewardsCategoryDto);
  }

  async findAll() {
    return await this.rewardsCategoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.rewardsCategoryRepository.findOne({ where: { id } })
    if (!category) throw new NotFoundException('Rewards category not found');
    return category;
  }

  async update(id: number, updateRewardsCategoryDto: UpdateRewardsCategoryDto) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Rewards category not found');
    return await this.rewardsCategoryRepository.update(id, updateRewardsCategoryDto);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Rewards category not found');
    return await this.rewardsCategoryRepository.delete(id);
  }
}
