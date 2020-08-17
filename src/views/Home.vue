<template>
	<div>
		<section class="main">
			<div class="container-fluid p-0">
				<div class="row">
					<div class="col-md-4 col-sm-5 d-none d-sm-block">
						<TodoList :lists="lists" :loading="loading" @deleted="DeleteList" @open="OpenAffair" />
					</div>
					<div class="col-md-8 col-sm-7">
						<Affairs :titleAffairs="titleAffairs" />
					</div>
				</div>
			</div>
		</section>
		<Footer @created="AddNewList" />
	</div>
</template>

<!-- TODO -->

<script>
	import TodoList from '@/components/app/TodoList.vue'
	import Affairs from '@/components/app/Affairs.vue'
	import Footer from '@/components/app/Footer.vue'
	
	export default {
		name: 'Home',
		data: () => ({
			lists: [],
			titleAffairs: '',
			idAffairs: '',
			loading: true
		}),
		components: {
			TodoList, Affairs, Footer
		},
		async mounted() {
			this.lists = await this.$store.dispatch('fetchLists')
			this.OpenAffair(this.lists[0].title, this.lists[0].id)
			this.loading = false
		},
		methods: {
			AddNewList(list) {
				this.lists.push(list)
			},
			DeleteList(id) {
				let del
				this.lists.forEach(function(item, index) {
					if ( item.id == id ) {
						del = index
					}
				})
				this.lists.splice(del, 1)
			},
			OpenAffair(title, id) {
				this.titleAffairs = title
				this.idAffairs = id
			}
		}
	}
</script>
