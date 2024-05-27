import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req, res);
});

export const TuitionPostController = {
  insertToDB,
};
