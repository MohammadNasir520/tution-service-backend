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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.create({
        data,
        include: {
            user: true,
            service: true,
        }
    });
    return result;
});
const getAllFromDB = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = authUser;
    console.log("authId", authUser);
    let result = [];
    if (role === user_1.ENUM_USER_ROLE.ADMIN || role === user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        result = yield prisma_1.default.booking.findMany({
            include: {
                user: true,
                service: true,
            }
        });
    }
    else {
        result = yield prisma_1.default.booking.findMany({
            where: {
                userId: userId
            },
            include: {
                user: true,
                service: true,
            }
        });
    }
    if (result.length <= 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "You don't have any booking");
    }
    return result;
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.BookingService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
