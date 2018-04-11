import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
Vue.use(Router);

let routes = new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/home',
    name: 'home',
    component: () =>
      import ('@/page/home/home.vue')
  }, {
    path: '/list',
    name: 'list',
    component: () =>
      import ('@/page/list/list.vue')
  }, {
    path: '/edit/:id',
    name: 'edit',
    component: () =>
      import ('@/page/edit/edit.vue')
  }]
});

routes.beforeEach((to, from, next) => {
  if (to.name == 'edit') {
    store.dispatch('reset');
  }
  if (!to.name) {
    routes.push('/list')
    next();
  } else {
    next();
  }
})

export default routes
