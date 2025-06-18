export type RegisterRequestDto = {
  id_user: number;
  username: string;
  email: string;
  password: string;
  smoker_type: string;
  packet_per_day: number;
  packet_price: number;
  smoker_duration: number;
  last_cigaret_smoked: Date;
  goal: string;
  created_at: Date;
  role: string;
};
