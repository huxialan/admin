import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';
import info from  './modules/info';
import  status from './modules/status'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    info,
    permission,
    status,
  },
  getters
});

export default store;
