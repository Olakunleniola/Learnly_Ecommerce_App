import { createStore } from 'vuex';
import axios from 'axios';

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
            const response = await axios.get('/api/products');
            commit('setProducts', response.data);
        },
        async login({ commit }, credentials) {
            const response = await axios.post('/api/auth/login', credentials);
            commit('setToken', response.data.token);
        },
        logout({ commit }) {
            commit('clearAuth');
        },
        async addProduct({ state }, productData) {
            await axios.post('/api/products', productData, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
            });
        },
        async editProduct({ state }, { id, productData }) {
            await axios.put(`/api/products/${id}`, productData, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
            });
        },
        async deleteProduct({ state }, id) {
            await axios.delete(`/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
            });
        },
    },
});
