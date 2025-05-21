import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyDto } from './create-emergency.dto';

export class UpdateEmergencyDto extends PartialType(CreateEmergencyDto) {
  name: string;
  description: string;
  tips: string;
  category: string;
  created_at: Date;
}
