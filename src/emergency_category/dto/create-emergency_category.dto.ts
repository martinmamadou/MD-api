import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmergencyCategoryDto {

    @IsString()
    @IsNotEmpty()
    name: string;
}
  
