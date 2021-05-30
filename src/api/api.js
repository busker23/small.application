import axios from "axios";

let api = axios.create({
    baseURL: "http://localhost:8001/api",
});

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.withCredentials = true;

export default api;