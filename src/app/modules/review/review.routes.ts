import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.parents),
  validateRequest(ReviewValidation.CreateZodSchema),
  ReviewController.insertIntoDB
);
router.get(
  '/',
  // auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.parents),
  ReviewController.getAllFromDB
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.parents),
  ReviewController.getByIdFromDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.parents),
  ReviewController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.parents),
  ReviewController.deleteFromDB
);
export const ReviewRoutes = router;
