import Vue from 'vue'
import Vuex from 'vuex'
import request from '../api/request'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    isAdmin: false,
    isRegistered: false,
    requests: {},
  },
  getters: {
    allRequests: state => {
      return state.requests;
    }
  },
  mutations: {
    registered(state, status) {
      state.isRegistered = status === 'success';
    },
    auth(state) {
      state.isAuthenticated = localStorage.getItem('auth') === 'true';
    },
    isAdmin(state, status) {
      state.isAdmin = status;
    },
    setRequests(state, requests) {
      state.requests = requests;
    },
    addNewRequest(state, request) {
      state.requests.push(request);
    },
    setAllRequests(state, requests) {
      state.requests = requests;
    },
    setOptionalRequests(state, requests) {
      state.requests = requests;
    }
  },
  actions: {
    register(context, form) {
      return new Promise((resolve, reject) => {
        request.register(form).then(response => {
          router.push({ path: '/login' });
          context.commit('registered', response.data);
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    login(context, form) {
      return new Promise((resolve, reject) => {
        request.login(form).then(response => {
          localStorage.setItem('auth', true);
          context.commit('auth');

          if (response.data.is_admin) {
            context.commit('isAdmin', true);
            router.push({ path: '/manager' });
          } else {
            router.push({ path: '/user' });
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        request.logout().then(response => {
          localStorage.removeItem('auth');
          context.commit('auth');
          router.push({ path: '/home' });
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    getUserRequests(context) {
      return new Promise((resolve, reject) => {
        request.getUserRequests().then(response => {
          context.commit('setRequests', response.data);
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    getAllRequests(context) {
      return new Promise((resolve, reject) => {
        request.getAllRequests().then(response => {
          context.commit('setAllRequests', response.data);
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    addNewUserRequest(context, data) {
      return new Promise((resolve, reject) => {
        request.addNewUserRequest(data).then(response => {
          context.commit('addNewRequest', response.data);
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    addResponse({dispatch}, data) {
      return new Promise((resolve, reject) => {
        request.addResponse(data).then(response => {
          dispatch('getAllRequests');
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    getOptionalRequests(context, data) {
      return new Promise((resolve, reject) => {
        request.getOptionalRequests(data).then(response => {
          context.commit('setOptionalRequests', response.data);
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
})
