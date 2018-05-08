import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
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
  // console.log(store.state.auth.username)
  let token = Cookies('username');
  console.log(store.state)
  if (!to.name) {
    console.log(111)
    next({
      name: 'list'
    })
  } else if (to.name == 'login') {
    console.log(222)
    if (!token || !store.state.auth.username) {
      console.log(333)
      next();
    } else {
      console.log(444)
      next({
        name: 'list'
      })
    }
  } else if (to.params.status == 2 || (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null))) {
    console.log(555)
    // routes.push({
    //   path: '/login',
    //   params: {
    //     status: 2
    //   }
    // })
    next({
      path : '/login'
    });
  } else {
    console.log(666)
    next();
  }

  // next();
})

export default routes
