import express from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// /api/dashboard/summary
router.get(
  "/summary",
  isAuthenticated,
  authorizeRoles("admin", "analyst"),
  getDashboardSummary,
);

export default router;
