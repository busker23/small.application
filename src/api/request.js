import api from './api.js';
import csrf from './csrf.js';

export default {
    async register(form) {
        await csrf.getCookie();
        return api.post('/register', form);
    },
    async login(form) {
        await csrf.getCookie();
        return api.post('/login', form);
    },
    async logout() {
        await csrf.getCookie();
        return api.post('/logout');
    },

    getUserRequests() {
        return api.get('/requests');
    },

    getAllRequests() {
        return api.get('/requests_manager');
    },

    addNewUserRequest(form) {
        return api.post('/request', form); 
    },

    addResponse(form) {
        return api.post('/response', form);
    },

    getOptionalRequests(params) {
        return api.get('/requests_option?answered=' + params.answered);
    }
}