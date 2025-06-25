import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodTrackerDto } from './create-mood_tracker.dto';

export class UpdateMoodTrackerDto extends PartialType(CreateMoodTrackerDto) {
  mood: string;
  intensity: string;
  catalyst: string;
  notes: string;
  created_at: Date;
  user_id: number;
}
