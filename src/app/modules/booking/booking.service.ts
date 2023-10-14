import { Booking } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Booking): Promise<Booking> => {

  const result = await prisma.booking.create({
    data,
    include: {
      user: true,
      service: true,
    }
  });
  return result;
};

const getAllFromDB = async (): Promise<Partial<Booking>[]> => {
  const result = await prisma.booking.findMany({
    include: {
      user: true,
      service: true,
    }
  });
  return result;
};

const getByIdFromDB = async (id: string): Promise<Partial<Booking | null>> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },

  });
  return result;

};

const updateIntoDB = async (
  id: string,
  payload: Partial<Booking>
): Promise<Partial<Booking>> => {
  const result = await prisma.booking.update({
    where: {
      id: id,
    },
    data: payload,

  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.booking.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const BookingService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
