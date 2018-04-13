import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import * as api from '@/api'
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
routes.beforeEach(async (to, from, next) => {
  const auth = store.state.auth;
  if (!auth.request) {
    const {
      result = ''
    } = await api.getUserInfo()
    store.dispatch('setUser', {
      request: true,
      username: result
    })
  }
  if (to.name == 'login') {
    if (auth.username != '') {
      routes.push('/list')
    }
  } else {
    if (auth.username == '') {
      routes.push('/login')
    }
  }
  if (!to.name) {
    routes.push('/list')
  }
  next();
})

export default routes
