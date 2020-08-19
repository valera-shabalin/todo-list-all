<template>
	<div id="app">
		<component :is="layout">
			<router-view />
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
	@import 'assets/css/loader.css'

	.loader-body
		display: flex
		justify-content: center
		align-items: center

	body
		-webkit-appearance: none

</style>
