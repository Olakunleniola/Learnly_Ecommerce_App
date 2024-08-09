import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import App from './App.vue';
import ProductList from './components/ProductList.vue';
import ProductDetail from './components/ProductDetail.vue';
import AddProduct from './components/AddEditProduct.vue';
import EditProduct from './components/AddEditProduct.vue';
import LogIn from './components/LogIn.vue';
import './assets/tailwind.css';

const routes = [
  { path: '/', name: 'Home', component: ProductList },
  { path: '/products/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/add-product', name: 'AddProduct', component: AddProduct, meta: { requiresAuth: true } },
  { path: '/edit-product/:id', name: 'EditProduct', component: EditProduct, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LogIn },
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
