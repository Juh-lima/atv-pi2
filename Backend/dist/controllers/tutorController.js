"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTutor = exports.updateTutor = exports.createTutor = exports.getTutors = void 0;
const uuid_1 = require("uuid");
// Mock databases
let tutors = [];
let animals = [];
const getTutors = (req, res) => {
    try {
        const userTutors = tutors.filter(tutor => tutor.userId === req.user.id);
        res.json(userTutors);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tutores' });
    }
};
exports.getTutors = getTutors;
const createTutor = (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const userId = req.user.id;
        // Validação básica
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' });
        }
        // Verificar se email já existe para este usuário
        const existingTutor = tutors.find(t => t.email === email && t.userId === userId);
        if (existingTutor) {
            return res.status(400).json({ error: 'Já existe um tutor com este email' });
        }
        const newTutor = {
            id: (0, uuid_1.v4)(),
            name,
            email,
            phone,
            userId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        tutors.push(newTutor);
        res.status(201).json(newTutor);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar tutor' });
    }
};
exports.createTutor = createTutor;
const updateTutor = (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        const userId = req.user.id;
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
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tutor' });
    }
};
exports.updateTutor = updateTutor;
const deleteTutor = (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const tutorIndex = tutors.findIndex(t => t.id === id && t.userId === userId);
        if (tutorIndex === -1) {
            return res.status(404).json({ error: 'Tutor não encontrado' });
        }
        // Remover animais associados
        animals = animals.filter(animal => animal.tutorId !== id);
        tutors = tutors.filter(t => t.id !== id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar tutor' });
    }
};
exports.deleteTutor = deleteTutor;
