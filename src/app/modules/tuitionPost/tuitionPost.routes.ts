import express from 'express';
import { TuitionPostController } from './tuitionPost.controller';

const router = express.Router();
router.post('/', TuitionPostController.insertToDB);
router.get('/', TuitionPostController.getAllFromDB);
router.get('/:id', TuitionPostController.getSingleById);
router.patch('/:id', TuitionPostController.updateIntoDB);
router.delete('/:id', TuitionPostController.deleteFromDB);

export const TuitionPostRouter = router;
