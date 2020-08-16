<template>
	<div>
		<section class="main">
			<div class="container-fluid p-0">
				<div class="row">
					<div class="col-md-4 col-sm-5 d-none d-sm-block">
						<TodoList  />
					</div>
					<div class="col-md-8 col-sm-7">
						<Affairs />
					</div>
				</div>
			</div>
		</section>
		<Footer @created="AddNewList"/>
	</div>
</template>

<script>
	import TodoList from '@/components/app/TodoList.vue'
	import Affairs from '@/components/app/Affairs.vue'
	import Footer from '@/components/app/Footer.vue'
	
	export default {
		name: 'Home',
		data: () => ({
			lists: []
		}),
		components: {
			TodoList, Affairs, Footer
		},
		methods: {
			AddNewList(list) {
				this.lists.push(list)
				console.log(this.lists)
			}
		}
	}
</script>
