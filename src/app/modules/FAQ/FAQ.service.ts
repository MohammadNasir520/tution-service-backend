import { FAQ } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (authUser: JwtPayload, data: FAQ): Promise<FAQ> => {


  const result = await prisma.fAQ.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<Partial<FAQ>[]> => {
  const result = await prisma.fAQ.findMany({

  });
  return result;
};

const getByIdFromDB = async (id: string): Promise<Partial<FAQ | null>> => {
  const result = await prisma.fAQ.findUnique({
    where: {
      id,
    },

  });
  return result;

};

const updateIntoDB = async (
  id: string,
  payload: Partial<FAQ>
): Promise<Partial<FAQ>> => {
  const result = await prisma.fAQ.update({
    where: {
      id: id,
    },
    data: payload,

  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.fAQ.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const FAQService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
