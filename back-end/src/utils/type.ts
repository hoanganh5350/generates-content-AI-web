export interface UserPayload {
  id: string;
  userName: string;
  email: string;
  phone: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  userName?: string;
  email?: string;
  phone?: string;
  password: string;
}
