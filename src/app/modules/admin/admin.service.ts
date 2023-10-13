import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: User): Promise<User> => {
  const isExist = await prisma.user.findFirst({
    where: {
      email: data.email
    }
  })
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin already exist by the email')
  }

  console.log(isExist)
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    where: {
      role: "admin"
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
  if (!result || result.length <= 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin not found')
  }
  return result;
};

const getByIdFromDB = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
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
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User>> => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
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

const deleteFromDB = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const AdminService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
