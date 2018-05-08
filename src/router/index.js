import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store/index.js'
// import * as api from '@/api'
import Cookies from 'js-cookie'
Vue.use(Router);
// console.log($.cookie)

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
  //如果token
  let token = Cookies('username');
  // if (!to.name) {
  //   console.log(111)
  //   routes.push('/list')
  // } else if (to.name == 'login') {
    
  //   if (to.params.status == 2) {
  //     console.log(333)
  //     next();
  //   } else {
  //     console.log(444)
  //     next({
  //       name: 'list'
  //     })
  //   }
  // } else if (to.params.status == 2 || (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null))) {
  //   console.log(222)
  //   routes.push({
  //     path: '/login',
  //     params: {
  //       status: 2
  //     }
  //   })
  //   next();
  // } else {
  //   next();
  // }

  next();
})

export default routes
