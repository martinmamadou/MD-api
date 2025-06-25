export class CreateMoodTrackerDto {
  mood: string;
  intensity: string;
  catalyst: string;
  notes: string;
  created_at: Date;
  user_id: number;
}
