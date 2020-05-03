import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import conversation from "./modules/conversation";
import user from "./modules/user";
export default new Vuex.Store({
    modules: {
        conversation,
        user
    }
})