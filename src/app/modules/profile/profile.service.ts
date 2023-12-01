import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getByIdFromDB = async (user: JwtPayload): Promise<Partial<User>> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,

      profileImg: true,
    },
  });
  console.log(result);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'your profile does not exist');
  }
  return result;
};
const updateByIdFromDB = async (
  user: JwtPayload,
  data: Partial<User>
): Promise<Partial<User | null>> => {
  const result = await prisma.user.update({
    where: {
      id: user.userId,
    },
    data: data,

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      profileImg: true,
    },
  });
  return result;
};

export const ProfileService = {
  getByIdFromDB,
  updateByIdFromDB,
};
