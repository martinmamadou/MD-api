import { PartialType } from '@nestjs/mapped-types';
import { CreateUserChallengeDto } from './create-user_challenge.dto';

export class UpdateUserChallengeDto extends PartialType(CreateUserChallengeDto) {
  is_completed: boolean;
  points_earned: number;
  created_at: Date;
  updated_at: Date;
  id_user: number;
  id_challenge: number;
}
