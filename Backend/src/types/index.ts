export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Animal {
  id: string;
  name: string;
  species: 'cat' | 'dog';
  breed: string;
  age: number;
  tutorId: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}