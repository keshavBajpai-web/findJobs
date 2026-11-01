import axios from "axios";

const Api = axios.create({
    baseURL:"https://findjobs-1euh.onrender.com/api/v1/",
    withCredentials:true
})

export default Api