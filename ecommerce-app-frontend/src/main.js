import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import App from './App.vue';
import ProductList from './components/ProductList.vue';
import ProductDetail from './components/ProductDetail.vue';
import AddProduct from './components/AddProduct.vue';
import EditProduct from './components/EditProduct.vue';
import Login from './components/Login.vue';
import './assets/tailwind.css';

const routes = [
    { path: '/', component: ProductList },
    { path: '/product/:id', component: ProductDetail, props: true },
    { path: '/add-product', component: AddProduct, meta: { requiresAuth: true } },
    { path: '/edit-product/:id', component: EditProduct, props: true, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.isAuthenticated) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
