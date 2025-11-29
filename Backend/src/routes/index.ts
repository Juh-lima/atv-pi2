import { Router } from 'express';
import { login } from '../controllers/authController';
import { getTutors, createTutor, updateTutor, deleteTutor } from '../controllers/tutorController';
import { getAnimals, createAnimal, updateAnimal, deleteAnimal, getAnimalsByTutor } from '../controllers/animalController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/auth/login', login);

router.get('/tutors', authenticateToken, getTutors);
router.post('/tutors', authenticateToken, createTutor);
router.put('/tutors/:id', authenticateToken, updateTutor);
router.delete('/tutors/:id', authenticateToken, deleteTutor);

router.get('/animals', authenticateToken, getAnimals);
router.post('/animals', authenticateToken, createAnimal);
router.put('/animals/:id', authenticateToken, updateAnimal);
router.delete('/animals/:id', authenticateToken, deleteAnimal);
router.get('/tutors/:tutorId/animals', authenticateToken, getAnimalsByTutor);

export default router;