import { TuitionPost } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertToDB = (data: TuitionPost) => {
  const result = prisma.tuitionPost.create({ data: data });
  return result;
};

export const TuitionPostService = {
  insertToDB,
};
