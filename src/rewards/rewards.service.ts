import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { Reward } from './entities/reward.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>
  ) {

  }
  async create(createRewardDto: CreateRewardDto) {
    return await this.rewardRepository.save(createRewardDto)
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
}
