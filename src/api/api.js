import axios from "axios";

let api = axios.create({
    baseURL: "http://localhost:8000",
});

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.withCredentials = true;

export default api;