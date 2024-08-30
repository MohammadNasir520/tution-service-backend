import { Prisma, TuitionPost } from '@prisma/client';
import prisma from '../../../shared/prisma';

// insert into Database
const insertToDB = async (data: TuitionPost) => {
  const result = await prisma.tuitionPost.create({ data: data });
  return result;
};

// get all from Database
const getAllFromDB = (filters: any) => {
  const { searchTerm, ...filterData } = filters;
  console.log('fi', filterData);
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

  const whereConditions: Prisma.TuitionPostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = prisma.tuitionPost.findMany({
    where: whereConditions,
  });
  return result;
};

// get single from database
const getSingleById = async (id: string) => {
  const result = await prisma.tuitionPost.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

// update
const updatedIntoDB = async (data: any, id: string) => {
  const result = await prisma.tuitionPost.update({
    where: {
      id: id,
    },
    data: data,
  });
  return result;
};

// delete from DB
const deleteFromDB = async (id: string) => {
  const result = await prisma.tuitionPost.delete({
    where: {
      id: id,
    },
  });
  return result;
};

// export all function
export const TuitionPostService = {
  insertToDB,
  getAllFromDB,
  getSingleById,
  updatedIntoDB,
  deleteFromDB,
};
