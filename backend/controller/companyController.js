import cloudinary from "../config/cloudinary.js"
import Company from "../models/companySchema.js"
import getDataUri from "../utils/dataUri.js"

const registerCompany = async (req, res) => {
    try {
        const userId = req.id
        if (!userId) {
            return res.status(400).json({ success: false, message: "user not authenticated" })
        }
        const { companyName } = req.body
        if (!companyName) {
            return res.status(400).json({ success: false, message: "company name required" })
        }
        const company = await Company.create({
            companyName,
            created_by: userId
        })
        return res.status(201).json({ success: true, message: "company registered successfully", company })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
const getAllCompany = async (req, res) => {
    try {
        const companies = await Company.find()
        res.status(200).json({ success: true, message: "all company found", companies })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
const getAdminCompany = async (req, res) => {
    try {
        const userId = req.id
        if (!userId) {
            return res.status(400).json({ success: false, message: "user not authenticated" })
        }
        const companies = await Company.find({ created_by: userId })
        if (companies.length <= 0) {
            return res.status(404).json({ success: false, message: "company not found" })
        }
        return res.status(200).json({ success: true, message: "company fetched successfully", companies })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params
        const company = await Company.findById(id)
        if (!company) {
            return res.status(400).json({ success: false, message: "company not found" })
        }
        return res.status(200).json({ success: true, message: "company fetched successfully", company })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
const updateCompany = async (req, res) => {
    try {
        const userId = req.id
        if (!userId) {
            return res.status(400).json({ success: false, message: "user not authenticated" })
        }
        const { id } = req.params
        const { companyName, location, website, description } = req.body
        const file = req.file
        let logo = ""
        if (file) {
            const fileUri = getDataUri(file)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
            logo = cloudResponse.secure_url
        }
        const company = await Company.findById(id)
        if (!company) {
            res.status(404).json({success:false,message:"company not found"})
        }

        if (companyName) company.companyName = companyName
        if (location) company.location = location
        if (website) company.website = website
        if (description) company.description = description
        if (logo) company.logo = logo

        await company.save()
        const updatedCompany = {
            _id:company._id,
            companyName:company.companyName,
            description:company.description,
            location:company.location,
            website:company.website,
            logo:company.logo
        }
        return res.status(200).json({success:true,message:"updated successfully",updatedCompany})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

export {registerCompany,getAllCompany,getAdminCompany,updateCompany,getCompanyById}
