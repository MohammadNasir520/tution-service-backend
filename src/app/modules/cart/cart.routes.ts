import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CartController } from './cart.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  // validateRequest(CartValidation.CreateZodSchema),
  CartController.insertIntoDB
);

router.get('/', CartController.getAllFromDB);
router.get('/:id', CartController.getByIdFromDB);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), CartController.deleteFromDB);
export const CartRoutes = router;
