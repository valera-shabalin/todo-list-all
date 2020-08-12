<template>
	<div id="app">
		<component :is="layout">
			<router-view/>
		</component>
	</div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
	computed: {
		layout() {
			return (this.$route.meta.layout || 'empty') + '-layout'
		}
	},
	components: {
		EmptyLayout, MainLayout
	}
}
</script>

<style lang="sass">
@import 'assets/css/style.css'
@import 'assets/css/bootstrap-grid.min.css'
.header .header__date 
	margin-left: 20px
	font-family: 'Montserrat-Medium', sans-serif

@media (max-width: 480px)
	.header
		&__date
			font-size: 12px

</style>
