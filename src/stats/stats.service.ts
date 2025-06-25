import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatsDto } from './dto/create-stats.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from './entities/stats.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private statsRepository: Repository<Stats>
  ) {

  }
  async createOne(createStatsDto: CreateStatsDto) {
    return await this.statsRepository.save(createStatsDto)
  }

  async findAll() {
    return await this.statsRepository.find({
      relations: ['user']
    })
  }

  async findOne(id: number) {
    const stats = await this.statsRepository.findOne({ where: { id } })
    if (!stats) throw new NotFoundException('Stats not found')
    return stats
  }

  async updateOne(id: number, updateStatDto: UpdateStatsDto) {
    const stats = await this.statsRepository.findOne({ where: { id } })
    if (!stats) throw new NotFoundException('Stats not found')
    return await this.statsRepository.update(id, updateStatDto);
  }

  async deleteOne(id: number) {
    const stats = await this.statsRepository.findOne({ where: { id } })
    if (!stats) throw new NotFoundException('Stats not found')
    await this.statsRepository.delete(stats)
    return stats
  }

  computeStatsForUser(user: User) {
    const now = new Date();
    const quitDate = user.created_at;
    const daysWithoutSmoking = Math.max(1, Math.floor((now.getTime() - quitDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    const cigarettesPerDay = user.packet_per_day // 20 cigarettes par paquet
    const cigaret_avoided = daysWithoutSmoking * cigarettesPerDay;
    const money_saved = daysWithoutSmoking * ((user.packet_price / 20) * cigarettesPerDay);

    return {
      days_without_smoking: daysWithoutSmoking,
      cigaret_avoided,
      money_saved,
    };
  }

  async updateStats(user: User) {
    const stats = this.computeStatsForUser(user);

    const existingStats = await this.statsRepository.findOne({
      where: { user: { id: user.id } }
    });

    if (existingStats) {
      Object.assign(existingStats, stats);
      return this.statsRepository.save(existingStats);
    } else {
      const newStats = this.statsRepository.create({
        ...stats,
        user
      });
      return this.statsRepository.save(newStats);
    }
  }

  async getStatsByUser(userId: number) {
    return this.statsRepository.findOne({
      where: { user: { id: userId } }
    });
  }
}
