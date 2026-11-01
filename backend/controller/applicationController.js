import Application from "../models/applicationSchema.js"
import Job from "../models/jobSchema.js"

const userApply = async (req, res) => {
  try {
    const userId = req.id
    if (!userId) {
      return res.status(400).json({ success: false, message: "user not found" })
    }
    const jobId = req.params.id
    if (!jobId) {
      return res.status(400).json({ success: false, message: "jobId not found" })
    }
    const application = await Application.findOne({ applicant: userId, job: jobId })
    if (application) {
      return res.status(400).json({ success: false, message: "application already exist" })
    }
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ success: false, message: "job not found" })
    }
    const newApplication = await Application.create({
      applicant: userId,
      job: jobId
    })
    job.application.push(newApplication._id)
    await job.save()
    return res.status(201).json({ success: true, message: "job applied successfully", newApplication })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error!", error: error.message })
  }
}
const getApplied = async (req, res) => {
  try {
    const userId = req.id
    if (!userId) {
      return res.status(400).json({ success: false, message: "user not found" })
    }
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: "job",
      populate: {
        path: "company"
      }
    })
    if (application.length <= 0) {
      return res.status(400).json({ success: false, message: "applicantion not found" })
    }
    return res.status(200).json({ success: true, message: "applied user found", application })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message })
  }
}
const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id
    if (!jobId) {
      return res.status(400).json({ success: false, message: "jobId not found" })
    }
    const job = await Job.findById(jobId).populate({
      path: "application",
      populate: {
        path: "applicant"
      }
    })
    return res.status(200).json({ success: true, message: "applicants found", job })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const userId = req.id
    if (!userId) {
      return res.status(400).json({ success: false, message: "user not found" })
    }
    const { status } = req.body
    if (!status) {
      return res.status(401).json({ success: false, message: "status required" })
    }
    const applicationId = req.params.id
    const application = await Application.findOne({ _id: applicationId })
    if (!application) {
      return res.status(400).json({ success: true, message: "application not found" })
    }
    application.status = status.toLowerCase()
    await application.save()
    return res.status(200).json({ success: true, message: "status updated", application })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message })
  }
}

export {userApply , getApplied,getApplicant,updateStatus}



