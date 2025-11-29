"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const tutorController_1 = require("../controllers/tutorController");
const animalController_1 = require("../controllers/animalController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Rotas públicas
router.post('/auth/login', authController_1.login);
// Rotas protegidas
router.get('/tutors', auth_1.authenticateToken, tutorController_1.getTutors);
router.post('/tutors', auth_1.authenticateToken, tutorController_1.createTutor);
router.put('/tutors/:id', auth_1.authenticateToken, tutorController_1.updateTutor);
router.delete('/tutors/:id', auth_1.authenticateToken, tutorController_1.deleteTutor);
router.get('/animals', auth_1.authenticateToken, animalController_1.getAnimals);
router.post('/animals', auth_1.authenticateToken, animalController_1.createAnimal);
router.put('/animals/:id', auth_1.authenticateToken, animalController_1.updateAnimal);
router.delete('/animals/:id', auth_1.authenticateToken, animalController_1.deleteAnimal);
router.get('/tutors/:tutorId/animals', auth_1.authenticateToken, animalController_1.getAnimalsByTutor);
exports.default = router;
