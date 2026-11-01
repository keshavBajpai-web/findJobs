import express from "express"
const router = express.Router()
import {
    userRegister, 
    userLogin,
    profileUpdate,
    updateById,
    logout
} from "../controller/userController.js"
import { singleUpload } from "../middleware/multer.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

router.route("/login").post(userLogin)
router.route("/signup").post(singleUpload,userRegister)
router.route("/logout").post( isAuthenticated,logout)
router.route("/updateById/:id").put( isAuthenticated,updateById)
router.route("/updateProfile").put( isAuthenticated,singleUpload,profileUpdate)

export default router