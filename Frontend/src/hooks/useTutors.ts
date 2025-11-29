import { useCallback } from 'react';
import { useApp } from '../contexts/AppContext.tsx';
import { tutorService } from '../services/api.ts';
import type { Tutor } from '../types/index.ts';

export const useTutors = () => {
  const { 
    tutors, 
    setTutors, 
    addTutor, 
    updateTutor, 
    deleteTutor, 
    setLoading, 
    setError 
  } = useApp();

  const fetchTutors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await tutorService.getAll();
      setTutors(response.data);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erro ao carregar tutores');
    } finally {
      setLoading(false);
    }
  }, [setTutors, setLoading, setError]);

  const createTutor = useCallback(async (tutorData: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const response = await tutorService.create(tutorData);
      addTutor(response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar tutor';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [addTutor, setLoading, setError]);

  const editTutor = useCallback(async (id: string, tutorData: Partial<Tutor>) => {
    setLoading(true);
    try {
      const response = await tutorService.update(id, tutorData);
      updateTutor(response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao atualizar tutor';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [updateTutor, setLoading, setError]);

  const removeTutor = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await tutorService.delete(id);
      deleteTutor(id);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao deletar tutor';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [deleteTutor, setLoading, setError]);

  return {
    tutors,
    fetchTutors,
    createTutor,
    editTutor,
    removeTutor,
  };
};