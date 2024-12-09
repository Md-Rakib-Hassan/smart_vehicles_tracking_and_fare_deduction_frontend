import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/",
    // baseURL:"https://test-server-iot.vercel.app/",
})

const useAxios = () => {
    return instance;
};

export default useAxios;