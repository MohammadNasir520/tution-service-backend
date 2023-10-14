import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.createServiceZodSchema),
  ServiceController.insertIntoDB
);
router.get('/', ServiceController.getAllFromDB);

router.get('/:categoryId/category', ServiceController.getAllFromDBByCategoryId);
router.get('/:id', ServiceController.getByIdFromDB);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), ServiceController.updateIntoDB);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), ServiceController.deleteFromDB);

export const ServiceRoutes = router;
