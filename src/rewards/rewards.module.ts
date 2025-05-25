import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { Reward } from './entities/reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardsCategory } from 'src/rewards-category/entities/rewards-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reward, RewardsCategory])],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
