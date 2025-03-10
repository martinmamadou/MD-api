export type RegisterRequestDto = {
  id_user: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  role: string;
};
