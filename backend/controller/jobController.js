import Job from "../models/jobSchema.js"

const postJob = async (req, res) => {
    try {
        const userId = req.id
        if (!userId) {
            return res.status(400).json({ success: false, message: "user not authenticated" })
        }
        const { title, description, salary, location,position, requirements, jobType, companyId, experienceLevel } = req.body
        if (!title || !description || !location || !salary || !requirements || !jobType || !companyId || !experienceLevel || !position) {
            return res.status(400).json({ success: false, message: "all field required" })
        }

        const jobPost = await Job.create({
            created_by: userId,
            title,
            description, 
            salary,
            location,
            position,
            jobType,
            experienceLevel,
            requirements: requirements ? requirements.split(",") : [],
            company: companyId
        })
        const populatedJob = await jobPost.populate("company")
        return res.status(201).json({ success: true, message: "job created successfully", jobPost: populatedJob })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
const getJobById = async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.findById(id).populate({
            path: "application",
            populate: {
                path: "applicant"
            }

        })
        if (!job) {
            return res.status(400).json({ success: false, message: "job not found" })
        }
        return res.status(200).json({ success: true, message: "job found", job })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query ={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs = await Job.find(query).populate("company")
          if (jobs.length === 0) {
      return res.status(404).json({ success: false, message: "job not found" })
    }

    return res.status(200).json({ success: true, message: "job found", jobs })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
const getAdminJob = async (req, res) => {
    try {
        const userId = req.id
        if (!userId) {
            return res.status(400).json({ success: false, message: "user not authenticated" })
        }
        const job = await Job.find({ created_by: userId }).populate("company")
        if (job.length <= 0) {
            return res.status(400).json({ success: false, message: "job not found" })
        }
        return res.status(200).json({ success: true, message: "jobs found", job })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
export { postJob, getAdminJob, getAllJob, getJobById }