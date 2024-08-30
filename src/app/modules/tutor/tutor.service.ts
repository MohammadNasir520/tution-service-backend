import { Prisma, User, UserRole } from '@prisma/client';
import prisma from '../../../shared/prisma';

// insert into Database
const insertToDB = async (data: User) => {
  const result = await prisma.user.create({ data: data });
  return result;
};

// get all from Database
const getAllFromDB = (filters: any) => {
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['jobId'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }
  andConditions.push({
    role: UserRole.tutor,
  });
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = prisma.user.findMany({
    where: whereConditions,
    select: {
      name: true,
      email: true,

      role: true,
      contactNo: true,
      profileImg: true,
      createdAt: true,
    },
  });
  return result;
};

// get single from database
const getSingleById = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

// update
const updatedIntoDB = async (data: any, id: string) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
  return result;
};

// delete from DB
const deleteFromDB = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};

// export all function
export const UserService = {
  insertToDB,
  getAllFromDB,
  getSingleById,
  updatedIntoDB,
  deleteFromDB,
};
