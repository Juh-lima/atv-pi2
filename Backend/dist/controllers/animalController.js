"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimalsByTutor = exports.deleteAnimal = exports.updateAnimal = exports.createAnimal = exports.getAnimals = void 0;
const uuid_1 = require("uuid");
// Mock databases (mesmas do tutorController)
let tutors = [];
let animals = [];
const getAnimals = (req, res) => {
    try {
        const userTutors = tutors.filter(t => t.userId === req.user.id);
        const userAnimals = animals.filter(animal => userTutors.some(tutor => tutor.id === animal.tutorId));
        res.json(userAnimals);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar animais' });
    }
};
exports.getAnimals = getAnimals;
const createAnimal = (req, res) => {
    try {
        const { name, species, breed, age, tutorId, photo } = req.body;
        const userId = req.user.id;
        // Validação
        if (!name || !species || !breed || !age || !tutorId) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
        }
        // Verificar se tutor pertence ao usuário
        const tutor = tutors.find(t => t.id === tutorId && t.userId === userId);
        if (!tutor) {
            return res.status(404).json({ error: 'Tutor não encontrado' });
        }
        const newAnimal = {
            id: (0, uuid_1.v4)(),
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
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar animal' });
    }
};
exports.createAnimal = createAnimal;
const updateAnimal = (req, res) => {
    try {
        const { id } = req.params;
        const { name, species, breed, age, photo } = req.body;
        const userId = req.user.id;
        const animalIndex = animals.findIndex(a => a.id === id);
        if (animalIndex === -1) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        // Verificar se o tutor do animal pertence ao usuário
        const animalTutor = tutors.find(t => t.id === animals[animalIndex].tutorId && t.userId === userId);
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
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar animal' });
    }
};
exports.updateAnimal = updateAnimal;
const deleteAnimal = (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const animalIndex = animals.findIndex(a => a.id === id);
        if (animalIndex === -1) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        // Verificar se o tutor do animal pertence ao usuário
        const animalTutor = tutors.find(t => t.id === animals[animalIndex].tutorId && t.userId === userId);
        if (!animalTutor) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        animals = animals.filter(a => a.id !== id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar animal' });
    }
};
exports.deleteAnimal = deleteAnimal;
const getAnimalsByTutor = (req, res) => {
    try {
        const { tutorId } = req.params;
        const userId = req.user.id;
        // Verificar se tutor pertence ao usuário
        const tutor = tutors.find(t => t.id === tutorId && t.userId === userId);
        if (!tutor) {
            return res.status(404).json({ error: 'Tutor não encontrado' });
        }
        const tutorAnimals = animals.filter(animal => animal.tutorId === tutorId);
        res.json(tutorAnimals);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar animais do tutor' });
    }
};
exports.getAnimalsByTutor = getAnimalsByTutor;
