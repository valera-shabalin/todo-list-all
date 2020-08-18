<template>
	
	<div>

		<section class="main">
			<div class="container-fluid p-0">
				<div class="row">
					<div class="col-md-4 col-sm-5 d-none d-sm-block">
						<List v-model="list" @deleteList="deleteList" @changeList="changeList" />
					</div>
					<div class="col-md-8 col-sm-7">
						<Todo :todo="todo" @deleteTodo="deleteTodo" @updateWarn="updateWarn" @updateProgress="updateProgress" />
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
		},
		methods: {
			addList(list) {
				this.list.push(list)
				this.$message(`Список "${list.title}" успешно добавлен!`)
			},
			async addTodo(todo) {
				this.todo.list.push(todo)
				const update = {
					id: todo.listId,
					progress: 1
				}
				try {
					await this.$store.dispatch('updateListProgress', update)
					for (let i = 0; i < this.list.length; i++) {
						if ( this.list[i].id == this.todo.currentId ) {
							this.list[i].progress = 1
						}
					}
				} catch(e) {}
				this.$message(`Дело "${todo.title}" успешно добавлено!`)
			},
			async deleteList(id) {
				let title = ''
				for ( let i = 0; i < this.list.length; i++ ) {
					if ( this.list[i].id == id ) {
						title = this.list[i].title
						this.list.splice(i, 1)
					}
				}
				if ( this.list.length == 0 ) {
					this.todo.title = '',
					this.todo.currentId = ''
				}
				this.$message(`Список "${title}" успешно удалён!`)
			},
			async deleteTodo(listId, id) {
				const update = {
					id: listId,
					progress: 0
				}
				let title = ''
				try {
					await this.$store.dispatch('deleteTodo', { listId, id })

					for (let i = 0; i < this.todo.list.length; i++) {
						if ( this.todo.list[i].id == id ) {
							title = this.todo.list[i].title
							this.todo.list.splice(i, 1)
						}
					}
					
					if ( this.todo.list.length == 0 ) {
						await this.$store.dispatch('updateListProgress', update)
						for (let i = 0; i < this.list.length; i++) {
							if ( this.list[i].id == this.todo.currentId ) {
								this.list[i].progress = 0
							}
						}
					}
				} catch(e) {}
				this.$message(`Дело "${title}" успешно удалено!`)
			},
			async updateWarn(listId, id, warn) {
				try {
					await this.$store.dispatch('switchTodoWarn', { listId, id, warn })
					for (let i = 0; i < this.todo.list.length; i++) {
						if ( this.todo.list[i].id == id ) {
							this.todo.list[i].warn = !this.todo.list[i].warn
						}
					}
				} catch(e) {}
			},
			async updateProgress(listId, id, progress) {
				try {
					await this.$store.dispatch('switchTodoProgress', { listId, id, progress })
					for (let i = 0; i < this.todo.list.length; i++) {
						if ( this.todo.list[i].id == id ) {
							this.todo.list[i].progress = !this.todo.list[i].progress
						}
					}
				} catch(e) {}
			},
			async changeList(id, index) {
				try {
					this.todo.list = null
					this.todo.currentId = id
					this.todo.title = this.list[index].title
					this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
				} catch(e) {}
			}
		},
		components: {
			List, Todo, Footer
		}
	}
</script>
