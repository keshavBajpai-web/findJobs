import express from "express"
const router = express.Router()
import { postJob,getAdminJob,getAllJob,getJobById } from "../controller/jobController.js"
import isRecruiter from "../middleware/isRecruiter.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

router.route("/postJob").post( isAuthenticated ,isRecruiter,postJob)
router.route("/getAdminJob").get(isAuthenticated,isRecruiter,getAdminJob)
router.route("/getAllJob").get(getAllJob)
router.route("/getJobById/:id").get(getJobById)

export default router