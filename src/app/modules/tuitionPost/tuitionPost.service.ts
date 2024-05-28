import { TuitionPost } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertToDB = async (data: TuitionPost) => {
  const result = await prisma.tuitionPost.create({ data: data });
  return result;
};

const getAllFromDB = () => {
  const result = prisma.tuitionPost.findMany({});
  return result;
};

const getSingleById = async (id: string) => {
  const result = await prisma.tuitionPost.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};
export const TuitionPostService = {
  insertToDB,
  getAllFromDB,
  getSingleById,
};
