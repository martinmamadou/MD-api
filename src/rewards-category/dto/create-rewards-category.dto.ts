import { IsString, IsNotEmpty } from "class-validator";

export class CreateRewardsCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
