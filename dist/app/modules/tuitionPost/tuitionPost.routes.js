"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuitionPostRouter = void 0;
const express_1 = __importDefault(require("express"));
const tuitionPost_controller_1 = require("./tuitionPost.controller");
const router = express_1.default.Router();
router.post('/', tuitionPost_controller_1.TuitionPostController.insertToDB);
router.get('/', tuitionPost_controller_1.TuitionPostController.getAllFromDB);
router.get('/:id', tuitionPost_controller_1.TuitionPostController.getSingleById);
router.patch('/:id', tuitionPost_controller_1.TuitionPostController.updateIntoDB);
router.delete('/:id', tuitionPost_controller_1.TuitionPostController.deleteFromDB);
exports.TuitionPostRouter = router;
