import User from "../models/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js"
import { v2 as cloudinary } from "cloudinary"

const userRegister = async (req, res) => {
    try {
        const { fullName, email, password, role, phoneNumber } = req.body
        if (!fullName || !email || !password || !role || !phoneNumber) {
            return res.status(400).json({ success: false, message: "all field required" })
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ success: false, message: "user already exist" })
        }
        const file = req.file
        let profilePhoto = ""
        if (file) {
            const fileUri = getDataUri(file)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
            profilePhoto = cloudResponse.secure_url
        }


        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            fullName,
            email,
            password: hashPassword,
            role,
            phoneNumber,
            profile: {
                profilePhoto
            }
        })

        return res.status(201).json({ success: true, message: "user created successfully", user })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: "all field required" })
        }

        const userExist = await User.findOne({ email })

        if (!userExist) {
            return res.status(404).json({ success: false, message: "user not exist" })
        }

        if (role !== userExist.role) {
            return res.status(404).json({ success: false, message: "user does not exist with current role" })
        }

        const isMatch = await bcrypt.compare(password, userExist.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "invalid credentials" })
        }

        const token = jwt.sign(
            { userId: userExist._id },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        )

        const user = {
            _id: userExist._id,
            fullName: userExist.fullName,
            email: userExist.email,
            phoneNumber: userExist.phoneNumber,
            role: userExist.role,
            profile:userExist.profile 
        }

        return res.status(200).cookie("token",token, { maxAge: 5 * 24 * 60 * 60 * 1000, sameSite:"strict", httpOnly: true }).json({ success: true, message: "login successfully", token, user })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                success: true,
                message: "logout successfully"
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

const profileUpdate = async (req, res) => {
    try {
        const userId = req.id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "user not authenticated" })
        }

        const file = req.file
        let cloudResponse = null
        if (file) {
            const fileUri = getDataUri(file)
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",
                type: "upload",
                folder: "resumes"
            })
        }

        const { fullName, email, phoneNumber, role, skills, bio } = req.body
        const skillArray = skills ? skills.split(",") : []

        if (fullName) user.fullName = fullName
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (role) user.role = role
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillArray
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }


        await user.save()

        const updatedUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({ success: true, message: "updated successfully", updatedUser })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
const updateById = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, role, bio, skills } = req.body
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })
        }
        let skillArray = skills ? skills.split(",") : []
        if (fullName) user.fullName = fullName
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (role) user.role = role
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillArray
        await user.save()

        const newUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({ success: true, message: "updated successfully", newUser })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

export { userRegister, userLogin, logout, updateById, profileUpdate }