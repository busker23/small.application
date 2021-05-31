import api from "./api";

export default {
    getCookie() {
        return api.get('/sanctum/csrf-cookie');
    }
}