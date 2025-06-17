export interface UserPayload {
  id: number;
  username: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  phone: string;
  password: string
}