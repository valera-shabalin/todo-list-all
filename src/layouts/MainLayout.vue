<template>
	<div>
		<UserMenu v-model="userMenuOpen" />

		<Header @click="userMenuOpen = !userMenuOpen" v-model="userMenuOpen" />

		<router-view />

	</div>
</template>

<script>
import Header from '@/components/app/Header.vue'
import UserMenu from '@/components/app/UserMenu.vue'

export default {
	name: 'MainLayout',
	data: () => ({
		userMenuOpen: false
	}),
	components: {
		Header, UserMenu
	}
}
</script>