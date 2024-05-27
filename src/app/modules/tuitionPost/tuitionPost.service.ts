import { TuitionPost } from '@prisma/client';

const insertToDB = (data: TuitionPost) => {
  console.log(data);
};

export const TuitionPostService = {
  insertToDB,
};
