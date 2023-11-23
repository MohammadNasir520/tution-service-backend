import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { sendEMail } from '../../../utils/sendMail';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const sendVerifyEmail = async (data: User) => {
  const token = jwtHelpers.createToken(
    data,
    config.jwt.secret as string,
    config.jwt.email_verification_expires_in as string
  );

  const subject = 'Verify Email For TuitionMedia';
  const from = process.env.Email;
  const html = `<a href="http://localhost:5000/api/v1/auth/crate-account?token=${token}">Verify email & Create Account</a>`;
  return sendEMail(from, data.email, subject, html);
};
const createAccount = async (token: any) => {
  console.log('signup token', token);
  const decodedUsersData = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  // eslint-disable-next-line no-unused-vars
  // const { iat, exp, ...usersData } = decodedUsersData;

  const { name, email, password, contactNo, profileImg, role } =
    decodedUsersData;

  // console.log('decodeduserData', usersData);
  const result = await prisma.user.create({
    data: { name, email, password, contactNo, profileImg, role },
  });
  console.log('creat account ', result);
  return result;
};

const insertIntoDB = async (data: User, token: any): Promise<Partial<User>> => {
  console.log('signup token', token);
  const result = await prisma.user.create({
    data,
  });

  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatched = isUserExist.password === password;

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Password');
  }

  //create access token & refresh token

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,

    '365d'
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,

    '365d'
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  insertIntoDB,
  loginUser,
  sendVerifyEmail,
  createAccount,
};
