import { Cart } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  authUser: JwtPayload,
  data: Cart
): Promise<Cart> => {
  data.userId = authUser.userId;

  const isExist = await prisma.cart.findFirst({
    where: {
      userId: authUser.userId,
      serviceId: data.serviceId,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'already added to cart');
  }
  const result = await prisma.cart.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  authUser: JwtPayload
): Promise<Cart[] | undefined> => {
  const userId = authUser.userId;

  if (authUser?.role == 'admin' || authUser?.role == 'super_admin') {
    return await prisma.cart.findMany({
      include: {
        user: true,
        service: true,
      },
    });
  } else if (authUser.role == 'user') {
    return await prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        service: true,
      },
    });
  }
};

const getByIdFromDB = async (id: string): Promise<Partial<Cart | null>> => {
  const result = await prisma.cart.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.cart.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const CartService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
};
