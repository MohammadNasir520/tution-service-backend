import express from 'express';
import { UserController } from './tutor.controller';

const router = express.Router();
router.post('/', UserController.insertToDB);
router.get('/', UserController.getAllFromDB);
router.get('/:id', UserController.getSingleById);
router.patch('/:id', UserController.updateIntoDB);
router.delete('/:id', UserController.deleteFromDB);

export const TutorRouter = router;
