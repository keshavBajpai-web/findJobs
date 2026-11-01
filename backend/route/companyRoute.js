import express from "express"
const router = express.Router()
import {
    registerCompany,
    getAllCompany,
    getAdminCompany,
    updateCompany,
    getCompanyById
} from "../controller/companyController.js"
import isRecruiter from "../middleware/isRecruiter.js"
import { singleUpload } from "../middleware/multer.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

router.route("/registerCompany").post(isAuthenticated, isRecruiter, singleUpload, registerCompany)
router.route("/getAllcompany").get(getAllCompany)
router.route("/getAdminCompany").get( isAuthenticated,isRecruiter, getAdminCompany)
router.route("/updateCompany/:id").put(isAuthenticated,isRecruiter,singleUpload, updateCompany)
router.route("/getCompanyById/:id").get(getCompanyById)


export default router