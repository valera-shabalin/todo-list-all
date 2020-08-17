<template>
	<div class="user-menu" :class="{ js_open: value }">
		<nav class="user-menu__nav">
			<router-link to="/" class="user-menu__link btn btn_green">Главная страница</router-link>
			<router-link to="/edit" class="user-menu__link btn btn_blue">Редактирование профиля</router-link>
			<a href="#" @click.prevent="logout" class="user-menu__link btn btn_red">Выйти</a>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'Menu',
		props: ['value'],
		methods: {
			async logout() {
				await this.$store.dispatch('logout')
				this.$router.push('/login?message=logout')
			}
		}
	}
</script>