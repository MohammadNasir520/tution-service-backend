"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const FAQ_routes_1 = require("../modules/FAQ/FAQ.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const LatestUpdate_routes_1 = require("../modules/latestUpdate/LatestUpdate.routes");
const profile_routes_1 = require("../modules/profile/profile.routes");
const review_routes_1 = require("../modules/review/review.routes");
const service_routes_1 = require("../modules/service/service.routes");
const tuitionPost_routes_1 = require("../modules/tuitionPost/tuitionPost.routes");
const tutor_routes_1 = require("../modules/tutor/tutor.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/profile',
        route: profile_routes_1.ProfileRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/services',
        route: service_routes_1.ServiceRoutes,
    },
    {
        path: '/reviews',
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: '/bookings',
        route: booking_routes_1.BookingRoutes,
    },
    {
        path: '/faqs',
        route: FAQ_routes_1.FAQRoutes,
    },
    {
        path: '/latest-updates',
        route: LatestUpdate_routes_1.LatestUpdateRoutes,
    },
    {
        path: '/carts',
        route: cart_routes_1.CartRoutes,
    },
    {
        path: '/tuition-posts',
        route: tuitionPost_routes_1.TuitionPostRouter,
    },
    {
        path: '/tutors',
        route: tutor_routes_1.TutorRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
