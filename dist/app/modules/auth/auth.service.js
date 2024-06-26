"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const sendMail_1 = require("../../../utils/sendMail");
const sendVerifyEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: { email: data.email },
    });
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'user already exist');
    }
    const token = jwtHelpers_1.jwtHelpers.createToken(data, config_1.default.jwt.secret, config_1.default.jwt.email_verification_expires_in);
    const subject = 'Verify Email For TuitionMedia';
    const from = process.env.Email;
    const html = `<a href="http://localhost:5000/api/v1/auth/crate-account?token=${token}">Verify email & Create Account</a>`;
    return (0, sendMail_1.sendEMail)(from, data.email, subject, html);
});
const createAccount = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUsersData = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const { name, email, password, contactNo, profileImg, role } = decodedUsersData;
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { email: email } });
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'user already created by clicking here');
    }
    const result = yield prisma_1.default.user.create({
        data: { name, email, password, contactNo, profileImg, role },
    });
    return result;
});
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data,
    });
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatched = isUserExist.password === password;
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid Password');
    }
    //create access token & refresh token
    const { id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, '365d');
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, '365d');
    return {
        accessToken,
        refreshToken,
    };
});
exports.AuthService = {
    insertIntoDB,
    loginUser,
    sendVerifyEmail,
    createAccount,
};
