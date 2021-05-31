import api from './api.js';
import csrf from './csrf.js';

export default {
    async register(form) {
        await csrf.getCookie();
        return api.post('api/register', form);
    },
    async login(form) {
        await csrf.getCookie();
        return api.post('api/login', form);
    },
    async logout() {
        await csrf.getCookie();
        return api.post('api/logout');
    },

    getUserRequests() {
        return api.get('api/requests');
    },

    getAllRequests() {
        return api.get('api/requests_manager');
    },

    addNewUserRequest(form) {
        return api.post('api/request', form); 
    },

    addResponse(form) {
        return api.post('api/response', form);
    },

    getOptionalRequests(params) {
        return api.get('api/requests_option?answered=' + params.answered);
    }
}