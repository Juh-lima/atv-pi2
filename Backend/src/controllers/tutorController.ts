import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Tutor, Animal } from '../types';
import { AuthRequest } from '../middleware/auth';

// Mock databases
let tutors: Tutor[] = [];
let animals: Animal[] = [];

export const getTutors = (req: AuthRequest, res: Response) => {
  try {
    const userTutors = tutors.filter(tutor => tutor.userId === req.user!.id);
    res.json(userTutors);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tutores' });
  }
};

export const createTutor = (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    const userId = req.user!.id;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' });
    }

    const existingTutor = tutors.find(t => t.email === email && t.userId === userId);
    if (existingTutor) {
      return res.status(400).json({ error: 'Já existe um tutor com este email' });
    }

    const newTutor: Tutor = {
      id: uuidv4(),
      name,
      email,
      phone,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tutors.push(newTutor);
    res.status(201).json(newTutor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tutor' });
  }
};

export const updateTutor = (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const userId = req.user!.id;

    const tutorIndex = tutors.findIndex(t => t.id === id && t.userId === userId);
    if (tutorIndex === -1) {
      return res.status(404).json({ error: 'Tutor não encontrado' });
    }

    tutors[tutorIndex] = {
      ...tutors[tutorIndex],
      name,
      email,
      phone,
      updatedAt: new Date().toISOString()
    };

    res.json(tutors[tutorIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tutor' });
  }
};

export const deleteTutor = (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const tutorIndex = tutors.findIndex(t => t.id === id && t.userId === userId);
    if (tutorIndex === -1) {
      return res.status(404).json({ error: 'Tutor não encontrado' });
    }
    animals = animals.filter(animal => animal.tutorId !== id);
    tutors = tutors.filter(t => t.id !== id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tutor' });
  }
};