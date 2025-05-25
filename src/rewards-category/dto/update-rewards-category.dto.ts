import { PartialType } from '@nestjs/mapped-types';
import { CreateRewardsCategoryDto } from './create-rewards-category.dto';
import { IsString, IsNotEmpty } from 'class-validator';
export class UpdateRewardsCategoryDto extends PartialType(CreateRewardsCategoryDto) {
  @IsString()
  @IsNotEmpty()
  name: string;
}
