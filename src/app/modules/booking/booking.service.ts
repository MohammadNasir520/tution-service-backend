import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Booking): Promise<Booking> => {
  const result = await prisma.booking.create({
    data: data,
  });
  return result;
};

const getAllFromDB = async (
  authUser: JwtPayload
): Promise<Partial<Booking>[]> => {
  const { role, userId } = authUser;
  console.log('authId', authUser);
  let result: Booking[] = [];
  if (role === ENUM_USER_ROLE.ADMIN || role === ENUM_USER_ROLE.SUPER_ADMIN) {
    result = await prisma.booking.findMany({
      include: {
        user: true,
        service: true,
      },
    });
  } else {
    result = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        service: true,
      },
    });
  }

  if (result.length <= 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "You don't have any booking");
  }
  return result;
};

const getByIdFromDB = async (id: string): Promise<Partial<Booking | null>> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Booking>
): Promise<Partial<Booking>> => {
  const result = await prisma.booking.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.booking.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const BookingService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
