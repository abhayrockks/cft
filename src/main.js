import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "firebase";

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD_PSrGnT5EhF2zbSaoQJVy8ifZnx240BE",
  authDomain: "cft-database.firebaseapp.com",
  projectId: "cft-database",
  storageBucket: "cft-database.appspot.com",
  messagingSenderId: "1093394536412",
  appId: "1:1093394536412:web:aaa3c67ccc7ca98b5fe119"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
