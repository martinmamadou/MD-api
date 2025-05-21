import { PartialType } from '@nestjs/mapped-types';
import { CreateRewardDto } from './create-reward.dto';

export class UpdateRewardDto extends PartialType(CreateRewardDto) {
  name: string;
  description: string;
  points_needed: number;
  is_active: boolean;
  created_at: Date;
}
