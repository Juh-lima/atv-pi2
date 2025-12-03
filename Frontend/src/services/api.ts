
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3001/api',
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     console.error('API error:', error?.response?.status, error?.response?.data);
//     return Promise.reject(error);
//   }
// );

// export const authService = {
//   login: (email: string, password: string) =>
//     api.post('/auth/login', { email, password }),
// };

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config; 
});


api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(
      "API Error:",
      error?.response?.status,
      error?.response?.data
    );
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
};


export const tutorService = {
  list: () => api.get("/tutors"),
  get: (id: string) => api.get(`/tutors/${id}`),
  create: (data: any) => api.post("/tutors", data),
  update: (id: string, data: any) => api.put(`/tutors/${id}`, data),
  remove: (id: string) => api.delete(`/tutors/${id}`),
};

// --------------------
// ANIMAL SERVICE
// --------------------
// export const animalService = {
//   list: () => api.get("/animals"),
//   getByTutor: (tutorId: string) =>
//     api.get(`/tutors/${tutorId}/animals`),
//   create: (data: any) => api.post("/animals", data),
//   update: (id: string, data: any) => api.put(`/animals/${id}`, data),
//   remove: (id: string) => api.delete(`/animals/${id}`),
// };

export const animalService = {
  list: () => api.get('/animals'),
  getByTutor: (tutorId: number) => api.get(`/tutors/${tutorId}/animals`),
  create: (data: any) =>
    api.post('/animals', {
      ...data,
      tutorId: Number(data.tutorId)
    }),
  update: (id: number, data: any) =>
    api.put(`/animals/${id}`, {
      ...data,
      tutorId: Number(data.tutorId)
    }),
  remove: (id: number) => api.delete(`/animals/${id}`)
};

export default api;
