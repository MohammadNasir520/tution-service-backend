import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProfileController } from './profle.controller';

const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.parents,
    ENUM_USER_ROLE.tutor
  ),
  ProfileController.getAllFromDB
);
router.patch(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.parents,
    ENUM_USER_ROLE.tutor
  ),
  ProfileController.updateByIdFromDB
);

export const ProfileRoutes = router;
