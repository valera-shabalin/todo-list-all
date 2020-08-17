<template>
	
	<div>

		<section class="main">
			<div class="container-fluid p-0">
				<div class="row">
					<div class="col-md-4 col-sm-5 d-none d-sm-block">
						<List v-model="list" />
					</div>
					<div class="col-md-8 col-sm-7">
						<Todo />
					</div>
				</div>
			</div>
		</section>

		<Footer />

	</div>

</template>

<script>
	import Footer from '@/components/main/Footer'
	import List from '@/components/main/List'
	import Todo from '@/components/main/Todo'

	export default {
		name: 'Home',
		data: () => ({
			list: [],
			todo: [],
		}),
		mounted() {
			
		},
		components: {
			List, Todo, Footer
		}
	}
</script>
