import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

let routes = new Router({
    linkActiveClass: 'active',
    routes: [{
        path: '/home',
        name: 'home',
        component: r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')
    }, {
        path: '/resource',
        name: 'resource',
        component: r => require.ensure([], () => r(require('../page/resource/resource.vue')), 'resource'),
        redirect: {
            name: 'allTemplate'
        },
        children: [{
            path: 'allTemplate',
            name: 'allTemplate',
            component: r => require.ensure([], () => r(require('../page/resource/children/allTemplate.vue')), 'allTemplate'),
            redirect: {
                name: 'list'
            },
            children: [{
                path: 'detail/:id',
                name: 'detail',
                component: r => require.ensure([], () => r(require('../page/resource/children/allTemplate/detail.vue')), 'detail')
            }, {
                path: 'list',
                name: 'list',
                component: r => require.ensure([], () => r(require('../page/resource/children/allTemplate/list.vue')), 'list')
            }]
        }, {
            path: 'myTemplate',
            name: 'myTemplate',
            component: r => require.ensure([], () => r(require('../page/resource/children/myTemplate.vue')), 'list')
        }]
    }]
});

routes.beforeEach((to, from, next) => {
    if (!to.name) {
        routes.push('/home')
        next();
    } else {
        next();
    }
})

export default routes;
