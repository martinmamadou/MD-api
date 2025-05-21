import { PartialType } from '@nestjs/mapped-types';
import { CreateStatsDto } from './create-stats.dto';

export class UpdateStatsDto extends PartialType(CreateStatsDto) {
    cigaret_avoided: number;
    money_saved: number;
    days_without_smoking: number;
}
