import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FAQController } from './FAQ.controller';
import { FAQValidation } from './FAQ.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FAQValidation.CreateZodSchema),
  FAQController.insertIntoDB
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), FAQController.getAllFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), FAQController.getByIdFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FAQValidation.updateZodSchema),
  FAQController.updateIntoDB
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), FAQController.deleteFromDB);
export const FAQRoutes = router;
