import express from 'express';
import { TuitionPostController } from './tuitionPost.controller';

const router = express.Router();

router.post('/', TuitionPostController.insertToDB);
router.get('/', TuitionPostController.getAllFromDB);

router.get('/:id', TuitionPostController.getSingleById);

export const TuitionPostRouter = router;
