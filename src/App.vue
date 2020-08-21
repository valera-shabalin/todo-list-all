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

	input[type=checkbox]
		height: 15px	
		width: 15px	
		border: 1px solid #A6A6A6
		border-radius: 5px
		outline: none
		&:checked
			border: 1px solid #45AAF2
			background: #45AAF2

	label, input[type=checkbox]
		cursor: pointer

	.loader-body
		display: flex
		justify-content: center
		align-items: center

	.main__list-search
		margin-bottom: 15px
		width: 100%

</style>
