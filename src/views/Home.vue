<template>
	
	<div>

		<section class="main">
			<div class="container-fluid p-0">
				<div class="row">
					<div class="col-md-4 col-sm-5 d-none d-sm-block">
						<List v-model="list" @deleteList="deleteList" @changeList="changeList" />
					</div>
					<div class="col-md-8 col-sm-7">
						<Todo :todo="todo" @deleteTodo="deleteTodo" />
					</div>
				</div>
			</div>
		</section>

		<Footer :todo="todo" @addList="addList" @addTodo="addTodo" />

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
			todo: {
				title: '',
				currentId: '',
				list: []
			}
		}),
		async mounted() {
			this.list = await this.$store.dispatch('fetchLists')
			if ( this.list.length > 0 ) {
				this.todo.currentId = this.list[0].id
				this.todo.title = this.list[0].title
				this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
			}
			console.log(this.todo)
		},
		methods: {
			addList(list) {
				this.list.push(list)
			},
			addTodo(todo) {
				this.todo.list.push(todo)
			},
			deleteList(id) {
				for ( let i = 0; i < this.list.length; i++ ) {
					if ( this.list[i].id == id ) {
						this.list.splice(i, 1)
					}
				}
			},
			async deleteTodo(listId, id) {
				try {
					await this.$store.dispatch('deleteTodo', { listId, id })
					alert('Дело успешно удалено!')
				} catch(e) {}
				for (let i = 0; i < this.todo.list.length; i++) {
					if ( this.todo.list[i].id == id ) {
						this.todo.list.splice(i, 1)
					}
				}
			},
			async changeList(id, index) {
				this.todo.list = null
				this.todo.currentId = id
				this.todo.title = this.list[index].title
				this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
			}
		},
		components: {
			List, Todo, Footer
		}
	}
</script>
