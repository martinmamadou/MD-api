import { Module } from '@nestjs/common';
import { RewardsCategoryService } from './rewards-category.service';
import { RewardsCategoryController } from './rewards-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardsCategory } from './entities/rewards-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RewardsCategory])],
  controllers: [RewardsCategoryController],
  providers: [RewardsCategoryService],
})
export class RewardsCategoryModule {}
