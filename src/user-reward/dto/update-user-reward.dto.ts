import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRewardDto } from './create-user-reward.dto';

export class UpdateUserRewardDto extends PartialType(CreateUserRewardDto) {
  id_user: number;
  id_reward: number;
  reclaim_date: Date;
}
