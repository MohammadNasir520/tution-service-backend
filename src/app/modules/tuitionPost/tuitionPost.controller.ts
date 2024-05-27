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

export const TuitionPostController = {
  insertToDB,
};
