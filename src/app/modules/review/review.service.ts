import { Review } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (authUser: JwtPayload, data: Review): Promise<Review> => {
  const { userId } = authUser
  data.userId = userId



  const result = await prisma.review.create({
    data,
    include: {
      user: true,
      service: true,
    }
  });
  return result;
};

const getAllFromDB = async (): Promise<Partial<Review>[]> => {
  const result = await prisma.review.findMany({
    include: {
      user: true,
      service: true,
    }
  });
  return result;
};

const getByIdFromDB = async (id: string): Promise<Partial<Review | null>> => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },

  });
  return result;

};

const updateIntoDB = async (
  id: string,
  payload: Partial<Review>
): Promise<Partial<Review>> => {
  const result = await prisma.review.update({
    where: {
      id: id,
    },
    data: payload,

  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.review.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const ReviewService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
