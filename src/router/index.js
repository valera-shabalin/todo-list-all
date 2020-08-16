import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		meta: { layout: 'main', auth: true },
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		meta: { layout: 'empty' },
		component: () => import('@/views/Login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		meta: { layout: 'empty' },
		component: () => import('@/views/Register.vue')
	},
	{
		path: '/edit',
		name: 'Edit',
		meta: { layout: 'main', auth: true },
		component: () => import('@/views/Edit.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser
	const requireAuth = to.matched.some(record => record.meta.auth)

	if ( requireAuth && !currentUser ) {
		next('/login')
	} else {
		next()
	}
})

export default router
