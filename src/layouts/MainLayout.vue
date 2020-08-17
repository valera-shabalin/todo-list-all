<template>

	<div>

		<Header @openMenu="menu = !menu" v-model="menu" />
		
		<Menu v-model="menu" />

		<router-view />

	</div>

</template>

<script>
	import Header from '@/components/main/Header'
	import Menu from '@/components/main/Menu'

	export default {
		name: 'MainLayout',
		data: () => ({
			menu: false
		}),
		components: {
			Menu, Header
		}
	}
</script>