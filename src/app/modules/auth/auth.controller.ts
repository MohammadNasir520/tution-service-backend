import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const sendVerifyEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.sendVerifyEmail(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});
const createAccount = catchAsync(async (req: Request, res: Response) => {
  const token = req.query.token;

  // eslint-disable-next-line no-unused-vars
  const result = await AuthService.createAccount(token);
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'User created successfully',
  //   data: result,
  // });
  res.redirect('http://localhost:3000/login');
});
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const token = req?.query?.token;
  const result = await AuthService.insertIntoDB(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;

  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User loggedIn successfully !',
    data: others,
  });
});

export const AuthController = {
  insertIntoDB,
  loginUser,
  sendVerifyEmail,
  createAccount,
};
