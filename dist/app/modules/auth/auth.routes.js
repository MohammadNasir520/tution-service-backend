"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup-send-verification-email', (0, validateRequest_1.default)(user_validation_1.userValidation.UserSignUpZodSchema), auth_controller_1.AuthController.sendVerifyEmail);
router.get('/crate-account', auth_controller_1.AuthController.createAccount);
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.userValidation.UserSignUpZodSchema), auth_controller_1.AuthController.insertIntoDB);
router.post('/signin', (0, validateRequest_1.default)(user_validation_1.userValidation.UserSignInZodSchema), auth_controller_1.AuthController.loginUser);
exports.AuthRoutes = router;
