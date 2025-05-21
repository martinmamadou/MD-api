export class CreateUserChallengeDto {
  id_user: number;
  id_challenge: number;
  is_completed: boolean;
  points_earned: number;
  created_at: Date;
  updated_at: Date;
}
