import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyHistoryDto } from './create-emergency-history.dto';

export class UpdateEmergencyHistoryDto extends PartialType(CreateEmergencyHistoryDto) {
  id_user: number;
  id_emergency: number;
  view_date: Date;
}
