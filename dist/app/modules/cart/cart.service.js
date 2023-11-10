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
exports.CartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (authUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    data.userId = authUser.userId;
    const isExist = yield prisma_1.default.cart.findFirst({
        where: {
            userId: authUser.userId,
            serviceId: data.serviceId,
        },
    });
    console.log('cartExist', isExist);
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'already added to cart');
    }
    const result = yield prisma_1.default.cart.create({
        data,
    });
    return result;
});
const getAllFromDB = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('cart', authUser);
    const userId = authUser.userId;
    if ((authUser === null || authUser === void 0 ? void 0 : authUser.role) == 'admin' || (authUser === null || authUser === void 0 ? void 0 : authUser.role) == 'super_admin') {
        return yield prisma_1.default.cart.findMany({
            include: {
                user: true,
                service: true,
            },
        });
    }
    else if (authUser.role == 'user') {
        return yield prisma_1.default.cart.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: true,
                service: true,
            },
        });
    }
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.CartService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB,
};
