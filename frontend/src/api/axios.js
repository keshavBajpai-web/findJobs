import axios from "axios";

const Api = axios.create({
    baseURL:"http://localhost:3200/api/v1/",
    withCredentials:true
})

export default Api