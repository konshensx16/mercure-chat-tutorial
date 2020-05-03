import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "./store/store";

import App from "./components/App.vue";
import Blank from "./components/Right/Blank";
import Right from "./components/Right/Right";

Vue.use(VueRouter)

const routes = [
    {
        name: 'blank',
        path: '/',
        component: Blank
    },
    {
        name: 'conversation',
        path: '/conversation/:id',
        component: Right
    }
];

const router = new VueRouter({
    mode: "abstract",
    routes
})

store.commit("SET_USERNAME", document.querySelector('#app').dataset.username);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

router.replace('/')