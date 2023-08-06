export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  userName: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccessToken {
  id: number;
  userId: string;
  token: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshToken {
  id: number;
  userId: string;
  token: string;
  expires: Date;
  replacedByToken: string;
  createdAt: Date;
  updatedAt: Date;
}
