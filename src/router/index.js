import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store/index.js'
// import * as api from '@/api'
Vue.use(Router);

let routes = new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/list',
    name: 'list',
    component: () =>
      import ('@/page/list/list.vue')
  }, {
    path: '/edit/:id',
    name: 'edit',
    component: () =>
      import ('@/page/edit/edit.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () =>
      import ('@/page/login/login.vue')
  }]
});
routes.beforeEach((to, from, next) => {
  if (!to.name) {
    routes.push('/list')
  }
  next();
})

export default routes
