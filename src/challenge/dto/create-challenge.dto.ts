export class CreateChallengeDto {
    name: string;
    description:string;
    points: number;
    target : string
    is_active : Boolean
    badges: string
    created_at: Date
    estimated_duration: number
}
