import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { TuitionPostController } from './tuitionPost.controller';

const router = express.Router();
router.post(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.parents
  ),
  TuitionPostController.insertToDB
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.parents,
    ENUM_USER_ROLE.tutor,
    ENUM_USER_ROLE.parents
  ),
  TuitionPostController.getAllFromDB
);
router.get('/:id', TuitionPostController.getSingleById);
router.patch('/:id', TuitionPostController.updateIntoDB);
router.delete('/:id', TuitionPostController.deleteFromDB);

export const TuitionPostRouter = router;
