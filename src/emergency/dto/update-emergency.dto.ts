import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyDto } from './create-emergency.dto';

export class UpdateEmergencyDto extends PartialType(CreateEmergencyDto) {
  name: string;
  description: string;
  tips: string;
  category_id: number;
  created_at: Date;
}
