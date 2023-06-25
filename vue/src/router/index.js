// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Guest from '@/layouts/Guest.vue'
import Auth from '@/layouts/Auth.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Weather from '@/views/Weather.vue'
import Todos from '@/views/Todos.vue'
import EditTodo from '@/views/EditTodo.vue'
import Profile from '@/views/Profile.vue'
import EditProfile from '@/views/EditProfile.vue'





const routes = [
    {
        path: '/',
        component: Guest,
        children: [
            {
                path: '',
                name: 'Login',
                component: Login,
                meta: {title: 'login', requireToken: false}
            },
            {
                path: '/register',
                name: 'Register',
                component: Register,
                meta: {title: 'register', requireToken: false}
            },
        ],
    },
    {
        path: '/',
        component: Auth,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {title: 'dashboard', requireToken: true}
            },
            {
                path: '/todos',
                name: 'Todos',
                component: Todos,
                meta: {title: 'todos', requireToken: true},
                props: true
            },
            {
                path: '/todos/:id',
                name: 'EditTodo',
                component: EditTodo,
                meta: {title: 'edit todo', requireToken: true},
                props: true
            },
            {
                path: '/weather',
                name: 'Weather',
                component: Weather,
                meta: {title: 'weather', requireToken: true}
            },
            {
                path: '/profile',
                name: 'Profile',
                component: Profile,
                meta: {title: 'profile', requireToken: true}
            },
            {
                path: '/profile/edit',
                name: 'EditProfile',
                component: EditProfile,
                meta: {title: 'edit profile', requireToken: true}
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if(to.meta.requireToken && !localStorage.getItem('token')) {
        next({name: 'Login'})
    }
    if(!to.meta.requireToken && localStorage.getItem('token')) {
        next({name: 'Dashboard'})
    }
    next()
})

export default router
