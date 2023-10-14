import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post('/',
    auth(ENUM_USER_ROLE.USER),
    ReviewController.insertIntoDB);
router.get('/',
    auth(ENUM_USER_ROLE.ADMIN,),
    ReviewController.getAllFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.USER), ReviewController.getByIdFromDB);
router.patch('/:id', auth(ENUM_USER_ROLE.USER), ReviewController.updateIntoDB);
router.delete('/:id', auth(ENUM_USER_ROLE.USER), ReviewController.deleteFromDB);
export const ReviewRoutes = router;
