import { Module } from '@nestjs/common';
import { UserRewardService } from './user-reward.service';
import { UserRewardController } from './user-reward.controller';
import { UserReward } from './entities/user-reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from 'src/rewards/entities/reward.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserReward, User, Reward])],
  controllers: [UserRewardController],
  providers: [UserRewardService],
})
export class UserRewardModule {}
