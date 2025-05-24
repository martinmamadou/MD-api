
export class CreateChallengeDto {
    name: string;
    description:string;
    points: number;
    target : string
    is_active : Boolean
    badges: string
    estimated_duration: number
    category_id: number
}
