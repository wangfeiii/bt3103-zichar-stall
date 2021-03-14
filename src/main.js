import Vue from 'vue'
import App from './App.vue'
import Routes from './routes.js'
import VueRouter from 'vue-router' //step 1 = import and use vueRouter

Vue.config.productionTip = false
Vue.use(VueRouter)

//step 3:register route
const myRouter = new VueRouter({
  routes:Routes,
  mode:'history'
});

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')
