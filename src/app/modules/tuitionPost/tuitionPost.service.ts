import { TuitionPost } from '@prisma/client';
import prisma from '../../../shared/prisma';

// insert into Database
const insertToDB = async (data: TuitionPost) => {
  const result = await prisma.tuitionPost.create({ data: data });
  return result;
};

// get all from Database
const getAllFromDB = () => {
  const result = prisma.tuitionPost.findMany({});
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

// export all function
export const TuitionPostService = {
  insertToDB,
  getAllFromDB,
  getSingleById,
  updatedIntoDB,
};
