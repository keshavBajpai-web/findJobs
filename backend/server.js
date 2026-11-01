import express from "express"
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT
import CONNECTDB from "./config/db.js"
import cookieParser from "cookie-parser"
import userRoute from "./route/userRoute.js"
import companyRoute from "./route/companyRoute.js"
import jobRoute from "./route/jobRoute.js"
import applicationRoute from "./route/applicationRoute.js"
import cors from 'cors'
import path from 'path'

CONNECTDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://findjobs-1euh.onrender.com",
    credentials:true
}))

const _dirname = path.resolve()

// middleware
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.use(express.static(path.join(_dirname,"/frontend/dist")))

app.use("/{*splat}",(req,res)=>{
    res.sendFile(path.join(_dirname,"/frontend/dist/index.html"))
})


app.listen(port,()=>{
    console.log("app is listening on port",port);
})