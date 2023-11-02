import { LatestUpdate } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  authUser: JwtPayload,
  data: LatestUpdate
): Promise<LatestUpdate> => {
  const result = await prisma.latestUpdate.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<Partial<LatestUpdate>[]> => {
  const result = await prisma.latestUpdate.findMany({});
  return result;
};

const getByIdFromDB = async (
  id: string
): Promise<Partial<LatestUpdate | null>> => {
  const result = await prisma.latestUpdate.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<LatestUpdate>
): Promise<Partial<LatestUpdate>> => {
  const result = await prisma.latestUpdate.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.latestUpdate.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const LatestUpdateService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
