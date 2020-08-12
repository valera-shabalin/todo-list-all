<template>
	<div>
		<UserMenu v-model="isOpen" />

		<Header @click="isOpen = !isOpen" v-model="isOpen" />

		<router-view />

	</div>
</template>

<script>
import Header from '@/components/app/Header.vue'
import UserMenu from '@/components/app/UserMenu.vue'
export default {
	name: 'MainLayout',
	data: () => ({
		isOpen: false
	}),
	components: {
		Header, UserMenu
	}
}
</script>