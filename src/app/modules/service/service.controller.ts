import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',

    'title',
    'category',
    'minPrice',
    'maxPrice',
  ]);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await ServiceService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await ServiceService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ServiceService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

const getAllFromDBByCategoryId = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    console.log('cid', categoryId);

    const result = await ServiceService.getAllFromDBByCategoryId(categoryId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services with associated category data fetched successfully',
      data: result,
    });
  }
);

export const ServiceController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getAllFromDBByCategoryId,
};
