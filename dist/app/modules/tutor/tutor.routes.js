"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorRouter = void 0;
const express_1 = __importDefault(require("express"));
const tutor_controller_1 = require("./tutor.controller");
const router = express_1.default.Router();
router.post('/', tutor_controller_1.UserController.insertToDB);
router.get('/', tutor_controller_1.UserController.getAllFromDB);
router.get('/:id', tutor_controller_1.UserController.getSingleById);
router.patch('/:id', tutor_controller_1.UserController.updateIntoDB);
router.delete('/:id', tutor_controller_1.UserController.deleteFromDB);
exports.TutorRouter = router;
