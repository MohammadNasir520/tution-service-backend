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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (authUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = authUser;
    data.adminId = userId;
    const result = yield prisma_1.default.service.create({
        data,
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: ['title'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    // if (category) {
    //   andConditions.push({
    //     categoryId: {
    //       equals: category,
    //     },
    //   });
    // }
    if (maxPrice !== undefined) {
        const maxPriceFloat = parseFloat(maxPrice);
        if (!isNaN(maxPriceFloat)) {
            andConditions.push({
                price: {
                    lte: maxPriceFloat,
                },
            });
        }
    }
    if (minPrice !== undefined) {
        const minPriceFloat = parseFloat(minPrice);
        if (!isNaN(minPriceFloat)) {
            andConditions.push({
                price: {
                    gte: minPriceFloat,
                },
            });
        }
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.service.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                id: 'desc',
            },
    });
    const total = yield prisma_1.default.service.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const getAllFromDBByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(categoryId);
    const result = yield prisma_1.default.service.findMany({
    // where: {
    //   categoryId: categoryId,
    // },
    // include: {
    //   category: true,
    // },
    });
    return result;
});
exports.ServiceService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    getAllFromDBByCategoryId,
};
