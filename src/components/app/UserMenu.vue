<template>
	<div class="user-menu" :class="{js_open: value}">
		<nav class="user-menu__nav">
			<a href="#" class="user-menu__link btn btn_blue">Редактировать профиль</a>
			<a href="#" class="user-menu__link btn btn_red">Выйти</a>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'UserMenu',
		props: ['value']
	}
</script>