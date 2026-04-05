import express from "express";
import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(isAuthenticated);

router.route("/").get(getRecords).post(authorizeRoles("admin"), createRecord);

router
  .route("/:id")
  .get(getRecordById)
  .put(authorizeRoles("admin"), updateRecord)
  .delete(authorizeRoles("admin"), deleteRecord);

export default router;
