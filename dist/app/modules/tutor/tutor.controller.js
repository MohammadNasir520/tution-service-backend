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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const tutor_service_1 = require("./tutor.service");
// insert into db
const insertToDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield tutor_service_1.UserService.insertToDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tuition Post create successfully',
        data: result,
    });
}));
// get all from db
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm', 'studentGender']);
    console.log(filters);
    const result = yield tutor_service_1.UserService.getAllFromDB(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get all tuition Posts successful',
        data: result,
    });
}));
// get single from db by id
const getSingleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield tutor_service_1.UserService.getSingleById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'tuition post retrieved successfully',
        data: result,
        success: true,
    });
}));
// update single by db
const updateIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const result = yield tutor_service_1.UserService.updatedIntoDB(data, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tuition Post update successfully',
        data: result,
    });
}));
// delete from db
const deleteFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield tutor_service_1.UserService.deleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tuition Post delete successfully',
        data: result,
    });
}));
exports.UserController = {
    insertToDB,
    getAllFromDB,
    getSingleById,
    updateIntoDB,
    deleteFromDB,
};
