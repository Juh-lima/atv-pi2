import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Animal, Tutor } from '../types';
import { AuthRequest } from '../middleware/auth';

// Mock databases (mesmas do tutorController)
let tutors: Tutor[] = [];
let animals: Animal[] = [];

export const getAnimals = (req: AuthRequest, res: Response) => {
  try {
    const userTutors = tutors.filter(t => t.userId === req.user!.id);
    const userAnimals = animals.filter(animal => 
      userTutors.some(tutor => tutor.id === animal.tutorId)
    );
    res.json(userAnimals);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar animais' });
  }
};

export const createAnimal = (req: AuthRequest, res: Response) => {
  try {
    const { name, species, breed, age, tutorId, photo } = req.body;
    const userId = req.user!.id;

    if (!name || !species || !breed || !age || !tutorId) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const tutor = tutors.find(t => t.id === tutorId && t.userId === userId);
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor não encontrado' });
    }

    const newAnimal: Animal = {
      id: uuidv4(),
      name,
      species,
      breed,
      age: parseInt(age),
      tutorId,
      photo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    animals.push(newAnimal);
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar animal' });
  }
};

export const updateAnimal = (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, species, breed, age, photo } = req.body;
    const userId = req.user!.id;

    const animalIndex = animals.findIndex(a => a.id === id);
    if (animalIndex === -1) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    const animalTutor = tutors.find(t => 
      t.id === animals[animalIndex].tutorId && t.userId === userId
    );
    if (!animalTutor) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    animals[animalIndex] = {
      ...animals[animalIndex],
      name,
      species,
      breed,
      age: parseInt(age),
      photo,
      updatedAt: new Date().toISOString()
    };

    res.json(animals[animalIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar animal' });
  }
};

export const deleteAnimal = (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const animalIndex = animals.findIndex(a => a.id === id);
    if (animalIndex === -1) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    const animalTutor = tutors.find(t => 
      t.id === animals[animalIndex].tutorId && t.userId === userId
    );
    if (!animalTutor) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    animals = animals.filter(a => a.id !== id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar animal' });
  }
};

export const getAnimalsByTutor = (req: AuthRequest, res: Response) => {
  try {
    const { tutorId } = req.params;
    const userId = req.user!.id;

    const tutor = tutors.find(t => t.id === tutorId && t.userId === userId);
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor não encontrado' });
    }

    const tutorAnimals = animals.filter(animal => animal.tutorId === tutorId);
    res.json(tutorAnimals);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar animais do tutor' });
  }
};