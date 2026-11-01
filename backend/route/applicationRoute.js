import express from "express"
const router = express.Router()
import { userApply, getApplied, getApplicant, updateStatus } from "../controller/applicationController.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import isStudent from "../middleware/isStudent.js"
import isRecruiter from "../middleware/isRecruiter.js"

router.route("/userApply/:id").post(isAuthenticated, isStudent, userApply)
router.route("/getApplied").get(isAuthenticated, isStudent, getApplied)
router.route("/getApplicant/:id").get(isAuthenticated, isRecruiter, getApplicant)
router.route("/updateStatus/:id").put(isAuthenticated,isRecruiter,updateStatus)

export default router