import { PartialType } from '@nestjs/mapped-types';
import { CreateChallengeDto } from './create-challenge.dto';

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {
    name: string;
    description:string;
    points: number;
    target : string
    is_active : Boolean
    badges: string
    estimated_duration: number
}
