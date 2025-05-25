export class CreateRewardDto {
  name: string;
  description: string;
  points_needed: number;
  is_active: boolean;
  created_at: Date;
  category_id: number;
}
