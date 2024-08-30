import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './tutor.service';

// insert into db
const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserService.insertToDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tuition Post create successfully',
    data: result,
  });
});

// get all from db
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'studentGender']);
  console.log(filters);
  const result = await UserService.getAllFromDB(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all tuition Posts successful',
    data: result,
  });
});

// get single from db by id
const getSingleById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'tuition post retrieved successfully',
    data: result,
    success: true,
  });
});

// update single by db
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const result = await UserService.updatedIntoDB(data, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tuition Post update successfully',
    data: result,
  });
});

// delete from db
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tuition Post delete successfully',
    data: result,
  });
});
export const UserController = {
  insertToDB,
  getAllFromDB,
  getSingleById,
  updateIntoDB,
  deleteFromDB,
};
