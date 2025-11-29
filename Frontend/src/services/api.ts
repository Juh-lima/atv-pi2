import axios from 'axios';
import type { Tutor, Animal, User } from '../types/index.ts';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email: string, password: string) => 
    api.post<{ token: string; user: User }>('/auth/login', { email, password }),
};

export const tutorService = {
  getAll: () => api.get<Tutor[]>('/tutors'),
  create: (tutor: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Tutor>('/tutors', tutor),
  update: (id: string, tutor: Partial<Tutor>) => 
    api.put<Tutor>(`/tutors/${id}`, tutor),
  delete: (id: string) => api.delete(`/tutors/${id}`),
};

export const animalService = {
  getAll: () => api.get<Animal[]>('/animals'),
  create: (animal: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Animal>('/animals', animal),
  update: (id: string, animal: Partial<Animal>) => 
    api.put<Animal>(`/animals/${id}`, animal),
  delete: (id: string) => api.delete(`/animals/${id}`),
  getByTutorId: (tutorId: string) => 
    api.get<Animal[]>(`/tutors/${tutorId}/animals`),
};

export default api;