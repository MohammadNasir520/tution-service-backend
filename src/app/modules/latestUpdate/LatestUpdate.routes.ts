import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { LatestUpdateController } from './LatestUpdate.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  // validateRequest(LatestUpdateValidation.CreateZodSchema),
  LatestUpdateController.insertIntoDB
);

router.get('/', LatestUpdateController.getAllFromDB);
router.get('/:id', LatestUpdateController.getByIdFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  // validateRequest(LatestUpdateValidation.updateZodSchema),
  LatestUpdateController.updateIntoDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  LatestUpdateController.deleteFromDB
);
export const LatestUpdateRoutes = router;
