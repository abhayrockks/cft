import Vue from 'vue'
import Vuex from 'vuex'
import adminModule from "./modules/admin.module.js";
import loginModule from "./modules/login.module.js";
import guestModule from "./modules/guest.module.js";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      loginModule, adminModule, guestModule
  }
})
