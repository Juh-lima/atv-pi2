import { useCallback } from 'react';
import { useApp } from '../contexts/AppContext.tsx';
import { animalService } from '../services/api.ts';
import type { Animal } from '../types/index.ts';

export const useAnimals = () => {
  const { 
    animals, 
    setAnimals, 
    addAnimal, 
    updateAnimal, 
    deleteAnimal, 
    setLoading, 
    setError 
  } = useApp();

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await animalService.getAll();
      setAnimals(response.data);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erro ao carregar animais');
    } finally {
      setLoading(false);
    }
  }, [setAnimals, setLoading, setError]);

  const createAnimal = useCallback(async (animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const response = await animalService.create(animalData);
      addAnimal(response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar animal';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [addAnimal, setLoading, setError]);

  const editAnimal = useCallback(async (id: string, animalData: Partial<Animal>) => {
    setLoading(true);
    try {
      const response = await animalService.update(id, animalData);
      updateAnimal(response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao atualizar animal';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [updateAnimal, setLoading, setError]);

  const removeAnimal = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await animalService.delete(id);
      deleteAnimal(id);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao deletar animal';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [deleteAnimal, setLoading, setError]);

  return {
    animals,
    fetchAnimals,
    createAnimal,
    editAnimal,
    removeAnimal,
  };
};