import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyCategoryDto } from './create-emergency_category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmergencyCategoryDto extends PartialType(CreateEmergencyCategoryDto) {
  @IsString()
  @IsNotEmpty()
  name: string;
}
