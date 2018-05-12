import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import Cookies from 'js-cookie'
Vue.use(Router);
let routes = new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/list',
    name: 'list',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import ('@/page/list/list.vue')
  }, {
    path: '/edit/:id',
    name: 'edit',
    meta: {
      requiresAuth: true
    },
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
  let token = Cookies('username');
  if (!to.name) {
    next({
      name: 'list'
    })
  } else if (to.name == 'login') {
    if (!token || !store.state.auth.username) {
      next();
    } else {
      next({
        name: 'list'
      })
    }
  } else if (to.params.status == 2 || (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null))) {
    next({
      path: '/login'
    });
  } else {
    next();
  }
})

export default routes
