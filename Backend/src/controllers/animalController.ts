import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Animal, Tutor } from '../types';
import { AuthRequest } from '../middleware/auth';

// Mock databases (mesmas do tutorController)
let tutors: Tutor[] = [];
let animals: Animal[] = [];

/**
 * Retorna todos os animais do usuário logado
 */
export const getAnimals = (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // tutores do usuário logado
    const userTutors = tutors.filter(t => t.userId === userId);

    // animais de qualquer tutor do usuário
    const userAnimals = animals.filter(a =>
      userTutors.some(t => t.id === a.tutorId)
    );

    return res.json(userAnimals);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar animais' });
  }
};

/**
 * Cria um novo animal
 */
export const createAnimal = (req: AuthRequest, res: Response) => {
  try {
    const { name, species, breed, age, tutorId } = req.body;
    const userId = req.user!.id;

    // 🔥 VALIDAÇÃO SEGURA — sem forçar tipos errados
    if (!name || !species || !breed || !tutorId) {
      return res
        .status(400)
        .json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const numericAge = Number(age);

    if (isNaN(numericAge)) {
      return res.status(400).json({ error: 'Idade inválida' });
    }

    // 🔥 tutorId deve ser string (UUID)
    const tutor = tutors.find(t => t.id === String(tutorId) && t.userId === userId);

    if (!tutor) {
      return res.status(404).json({ error: 'Tutor não encontrado' });
    }

    const newAnimal: Animal = {
      id: uuidv4(),
      name,
      species,
      breed,
      age: numericAge,
      tutorId: String(tutorId),      // 🔥 garante string
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    animals.push(newAnimal);

    return res.status(201).json(newAnimal);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar animal' });
  }
};

/**
 * Atualiza animal
 */
export const updateAnimal = (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, species, breed, age } = req.body;

    const userId = req.user!.id;

    const index = animals.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    // Confirma que o animal pertence a tutor do usuário
    const tutor = tutors.find(
      t => t.id === animals[index].tutorId && t.userId === userId
    );

    if (!tutor) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    const numericAge = Number(age);
    if (!name || !species || !breed || isNaN(numericAge)) {
      return res
        .status(400)
        .json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    animals[index] = {
      ...animals[index],
      name,
      species,
      breed,
      age: numericAge,
      updatedAt: new Date().toISOString(),
    };

    return res.json(animals[index]);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar animal' });
  }
};

/**
 * Deleta animal
 */
export const deleteAnimal = (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const index = animals.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    const tutor = tutors.find(
      t => t.id === animals[index].tutorId && t.userId === userId
    );

    if (!tutor) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    animals = animals.filter(a => a.id !== id);

    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar animal' });
  }
};

/**
 * Retorna animais por tutor
 */
export const getAnimalsByTutor = (req: AuthRequest, res: Response) => {
  try {
    const { tutorId } = req.params;
    const userId = req.user!.id;

    const tutor = tutors.find(t => t.id === tutorId && t.userId === userId);

    if (!tutor) {
      return res.status(404).json({ error: 'Tutor não encontrado' });
    }

    const tutorAnimals = animals.filter(a => a.tutorId === tutorId);

    return res.json(tutorAnimals);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar animais do tutor' });
  }
};
