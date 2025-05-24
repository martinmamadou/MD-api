import { PartialType } from '@nestjs/mapped-types';
import { CreateChallengeCategoryDto } from './create-challenge_category.dto';

export class UpdateChallengeCategoryDto extends PartialType(CreateChallengeCategoryDto) {
  name:string
}
