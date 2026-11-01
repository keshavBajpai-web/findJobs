import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String
    },
    location: {
        type: String
    },
    website: {
        type: String
    },
    logo: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

export default mongoose.model("Company", companySchema)