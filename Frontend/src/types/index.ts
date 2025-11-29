export interface User {
  id: string;
  email: string;
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

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  tutors: Tutor[];
  animals: Animal[];
  loading: boolean;
  error: string | null;
}