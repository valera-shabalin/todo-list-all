import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		meta: { layout: 'main' },
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
		meta: { layout: 'main' },
		component: () => import('@/views/Edit.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
