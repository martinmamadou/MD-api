import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { Reward } from './entities/reward.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChallengeDto } from 'src/challenge/dto/create-challenge.dto';
import { RewardsCategory } from 'src/rewards-category/entities/rewards-category.entity';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(RewardsCategory)
    private categoryRepository: Repository<RewardsCategory>
  ) {

  }
  async create(createRewardDto: CreateRewardDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createRewardDto.category_id }
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const reward = this.rewardRepository.create({
      ...createRewardDto,
      category
    });

    return await this.rewardRepository.save(reward);
  }

  async findAll() {
    return await this.rewardRepository.find()
  }

  async findOne(id: number) {
    const reward = await this.rewardRepository.findOne({ where: { id } })
    if (!reward) throw new NotFoundException('Reward not found')
    return reward
  }

  async update(id: number, updateRewardDto: UpdateRewardDto) {
    const reward = await this.findOne(id)
    if (!reward) throw new NotFoundException('Reward not found')
    return await this.rewardRepository.update(id, updateRewardDto)
  }

  async remove(id: number) {
    const reward = await this.findOne(id)
    if (!reward) throw new NotFoundException('Reward not found')
    return await this.rewardRepository.delete(id)
  }

  async findByCategory(categoryId: number) {
    return await this.rewardRepository.find({
      relations: ['category'],
      where: {
        category: {
          id: categoryId
        }
      }
    });
  }
}
