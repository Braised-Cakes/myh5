import Vue from 'vue'
import Router from 'vue-router'
import Edit from '../page/edit/edit.vue'
import List from '../page/list/list.vue'
import Home from '../page/home/home.vue'
Vue.use(Router);

let routes = new Router({
    linkActiveClass: 'active',
    routes: [{
        path: '/home',
        name: 'home',
        component: Home,
    }, {
        path: '/list',
        name: 'list',
        component: List,
    }, {
        path: '/edit',
        name: 'edit',
        component: Edit,
    }]
});

// let routes = new Router({
//     linkActiveClass: 'active',
//     routes: [{
//         path: '/home',
//         name: 'home',
//         component: r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')
//     }, {
//         path: '/list',
//         name: 'list',
//         component: r => require.ensure([], () => r(require('../page/list/list.vue')), 'list'),
//     }, {
//         path: '/edit',
//         name: 'edit',
//         component: r => require.ensure([], () => r(require('../page/edit/edit.vue')), 'edit'),
//     }]
// });

routes.beforeEach((to, from, next) => {
    if (!to.name) {
        routes.push('/list')
        next();
    } else {
        next();
    }
})

export default routes;
