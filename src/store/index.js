import { createStore } from 'vuex'
import axios from '@/axios';
import router from '@/router';
export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || "",
    balance: null,
    categories: JSON.parse(localStorage.getItem("categories")) || [
      "Family",
      "Bills",
      "Food",
      "Entertainment",
      "Transport",
      "Shopping",
      "Health",
      "Holidays",
    ],
  },
  getters: {
    isLoggedIn: state => !!state.token,
    token: state => state.token,
    user: state => state.user,
    balance: state => state.balance,
    categories: state => state.categories.sort(),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setBalance(state, balance) {
      state.balance = balance;
    },
    setUser(state, data) {
      var user = {
        firstName: data.userFirstName,
        lastName: data.userLastName,
        email: data.userEmail,
      };
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user;
    },
    setCategories(state, data) {
      var cats = state.categories
      for (let item of data) {
        if (!cats.includes(item)) {
          cats.push(item);
        }
      }
      localStorage.setItem('categories', JSON.stringify(cats))
      state.categories = cats;
    },
    logout(state) {
      state.user = "";
      state.token = "";
    }
  },
  actions: {
    authRequest({ commit, dispatch, getters }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: payload.path,
          data: payload.data,
          method: "POST"
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    delRequest({ commit, dispatch, getters }, payload) {
      return new Promise((resolve, reject) => {
        const token = getters.token;

        axios({
          url: `api/v1/${payload.path}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 401) {
                dispatch('logout').then(() => {
                  location.href = "/auth/login?r=auth";
                });
              } else {
                reject(err)
              }
            } else {
              reject(err);
            }
          });
      });
    },
    putRequest({ commit, dispatch, getters }, payload) {
      return new Promise((resolve, reject) => {
        const token = getters.token;
        axios({
          url: `api/v1/${payload.path}`,
          data: payload.data,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 401) {
                dispatch('logout').then(() => {
                  location.href = "/auth/login?r=auth";
                });
              } else {
                reject(err)
              }
            } else {
              reject(err);
            }
          });
      });
    },
    patchRequest({ commit, dispatch, getters }, payload) {
      return new Promise((resolve, reject) => {
        const token = getters.token;
        axios({
          url: `api/v1/${payload.path}`,
          data: payload.data,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 401) {
                dispatch('logout').then(() => {
                  location.href = "/auth/login?r=auth";
                });
              } else {
                reject(err)
              }
            } else {
              reject(err);
            }
          });
      });
    },
    postRequest({ commit, dispatch, getters }, payload) {
      return new Promise((resolve, reject) => {
        const token = getters.token;
        axios({
          url: `api/v1/${payload.path}`,
          data: payload.data,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 401) {
                dispatch('logout').then(() => {
                  location.href = "/auth/login?r=auth";
                });
              } else {
                reject(err)
              }
            } else {
              reject(err);
            }
          });
      });
    },
    getRequest({ commit, dispatch, getters }, payload) {
      return new Promise((resolve, reject) => {
        const token = getters.token;

        axios({
          url: `api/v1/${payload.path}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 401) {
                dispatch('logout').then(() => {
                  location.href = "/auth/login?r=auth";
                });
              } else {
                reject(err)
              }
            } else {
              reject(err);
            }
          });
      });
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push({ name: 'auth.login' });
      delete axios.defaults.headers.common["Authorization"];
      return Promise.resolve();
    },
  },
  modules: {
  }
})
