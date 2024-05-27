import express from 'express';
import { TuitionPostController } from './tuitionPost.controller';

const router = express.Router();

router.post('/', TuitionPostController.insertToDB);

export const TuitionPostRouter = router;
