import { Prisma, Service } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  authUser: JwtPayload,
  data: Service
): Promise<Service> => {
  const { userId } = authUser;
  data.adminId = userId;
  const result = await prisma.service.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['title'].map(field => ({
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

  if (maxPrice !== undefined) {
    const maxPriceFloat = parseFloat(maxPrice);
    if (!isNaN(maxPriceFloat)) {
      andConditions.push({
        price: {
          lte: maxPriceFloat,
        },
      });
    }
  }

  if (minPrice !== undefined) {
    const minPriceFloat = parseFloat(minPrice);
    if (!isNaN(minPriceFloat)) {
      andConditions.push({
        price: {
          gte: minPriceFloat,
        },
      });
    }
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    where: whereConditions,
    include: {
      bookings: true,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy as string]: options.sortOrder,
          }
        : {
            id: 'desc',
          },
  });
  const total = await prisma.service.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      bookings: true,
      reviews: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.service.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const ServiceService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
