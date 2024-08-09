import { createStore } from 'vuex';
import axios from 'axios';

const url = "http://localhost:3000"

export default createStore({
    state: {
        products: [],
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setToken(state, token) {
            state.token = token;
            state.isAuthenticated = !!token;
            localStorage.setItem('token', token);
        },
        clearAuth(state) {
            state.token = '';
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
    actions: {
        async fetchProducts({ commit }) {
            const response = await axios.get(`${url}/products`);
            commit('setProducts', response.data);
        },
        async login({ commit }, credentials) {
            const response = await axios.post(`${url}/auth/login`, credentials);
            commit('setToken', response.data.token);
        },
        logout({ commit }) {
            commit('clearAuth');
        },
        async addProduct({ state }, productData) {
            await axios.post(`${url}/products`, productData, {
                headers: {
                    'x-auth-token': state.token,
                },
            });
        },
        async editProduct({ state }, { id, productData }) {
            await axios.put(`${url}/products/${id}`, productData, {
                headers: {
                    'x-auth-token': state.token,
                },
            });
        },
        async deleteProduct({ state }, id) {
            await axios.delete(`${url}/products/${id}`, {
                headers: {
                    'x-auth-token': state.token,
                },
            });
        },
    },
});
