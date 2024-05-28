import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TuitionPostService } from './tuitionPost.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await TuitionPostService.insertToDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tuition Post create successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await TuitionPostService.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all tuition Posts successful',
    data: result,
  });
});

const getSingleById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TuitionPostService.getSingleById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'tuition post retrieved successfully',
    data: result,
    success: true,
  });
});
export const TuitionPostController = {
  insertToDB,
  getAllFromDB,
  getSingleById,
};
