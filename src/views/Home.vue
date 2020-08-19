<template>
	<div>
		<EditList v-model="editListData.hidden">
			<a href="#" class="close" @click.prevent="closeEditList">Закрыть</a>
			<h2>{{ editListData.title }}</h2>
			<form @submit.prevent="updateData">
				<input 
					type="text" 
					class="default-input" 
					placeholder="Название списка"
					v-model="editListData.listTitle"
				/>
				<input type="submit" class="btn btn_blue" value="Обновить">
			</form>
		</EditList>

		<EditTodo v-model="editTodoData.hidden">
			<a href="#" class="close" @click.prevent="closeEditTodo">Закрыть</a>
			<h2>{{ editTodoData.title }}</h2>
			<form @submit.prevent="updateTodoData">
				<input 
					type="text" 
					class="default-input" 
					placeholder="Название списка"
					v-model="editTodoData.todoTitle"
				/>
				<input 
					type="text" 
					class="default-input" 
					placeholder="Описание списка"
					v-model="editTodoData.todoDesc"
				/>
				<input type="submit" class="btn btn_blue" value="Обновить">
			</form>
		</EditTodo>

		<Loader v-if="loading" />
		<section class="main" v-else>
			<div class="container-fluid p-0">
				<div class="row">
					<div class="col-md-4 col-sm-5">
						<List :list="list" :loading="loading" @deleteList="deleteList" @changeList="changeList" @editList="editList" />
					</div>
					<div class="col-md-8 col-sm-7">
						<Todo :todo="todo" @deleteTodo="deleteTodo" @updateWarn="updateWarn" @updateTodoProgress="updateTodoProgress" @createSubtask="createSubtask" @deleteSubtask="deleteSubtask" @editTodo="editTodo" />
					</div>
				</div>
			</div>
		</section>
		<Footer :todo="todo" @addList="addList" @addTodo="addTodo" />
	</div>
</template>

<style lang="sass">
	.loader-body
		height: 100vh
	    width: 100vw
</style>

<script>
	import Footer from '@/components/main/Footer'
	import List from '@/components/main/List'
	import Todo from '@/components/main/Todo'
	import EditList from '@/components/main/EditList'
	import EditTodo from '@/components/main/EditTodo'

	export default {
		name: 'Home',
		data: () => ({
			loading: true,
			list: [],
			todo: {
				title: '',
				currentId: '',
				list: []
			},
			editListData: {
				title: '',
				listId: '',
				listTitle: '',
				index: '',
				hidden: true
			},
			editTodoData: {
				title: '',
				listId: '',
				todoId: '',
				todoTitle: '',
				todoDesc: '',
				index: '',
				hidden: true
			}
		}),
		async mounted() {
			this.list = await this.$store.dispatch('fetchLists')
			if ( this.list.length > 0 ) {
				this.todo.currentId = this.list[0].id
				this.todo.title = this.list[0].title
				this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
			}
			this.loading = false
		},
		methods: {
			editList(listId, title, index) {
				this.editListData = {
					title: `Редактирование списка "${title}"`,
					listTitle: title,
					listId,
					index,
					hidden: false
				}
			},
			editTodo(todoId, listId, title, description, index) {
				this.editTodoData = {
					title: `Редактирование дела "${title}"`,
					todoTitle: title,
					todoDesc: description,
					listId,
					todoId,
					index,
					hidden: false
				}
			},
			closeEditList() {
				this.editListData = {
					title: '',
					listId: '',
					index: '',
					hidden: true
				}
			},
			closeEditTodo() {
				this.editTodoData = {
					title: '',
					todoTitle: '',
					todoDesc: '',
					listId: '',
					todoId: '',
					index: '',
					hidden: true
				}
			},
			async updateListData() {
				try {
					const info = {
						id: this.editListData.listId,
						title: this.editListData.listTitle
					}
					await this.$store.dispatch('updateListTitle', info)
					this.list[this.editListData.index].title = info.title
					this.closeEditList()
					this.$message('Список успешно обновлён!')
				} catch(e) {}
			},
			async updateTodoData() {
				try {
					const info = {
						id: this.editTodoData.todoId,
						listId: this.editTodoData.listId,
						title: this.editTodoData.todoTitle,
						description: this.editTodoData.todoDesc
					}
					await this.$store.dispatch('updateTodoData', info)
					this.todo.list[this.editTodoData.index].title = info.title
					this.todo.list[this.editTodoData.index].description = info.description
					this.closeEditTodo()
					this.$message('Дело успешно обновлено!')
				} catch(e) {}
			},
			async addList(list) {
				this.list.push(list)
				this.$message(`Список "${list.title}" успешно добавлен!`)
				this.todo.title = list.title
				this.todo.currentId = list.id
				this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
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
			async deleteList(id, listTitle) {
				this.$prompt(`Удалить список "${listTitle}?"`, async () => {
					try {
						let title = ''
						await this.$store.dispatch('deleteList', id)
						for ( let i = 0; i < this.list.length; i++ ) {
							if ( this.list[i].id == id ) {
								title = this.list[i].title
								this.list.splice(i, 1)
							}
						}
						if ( this.list.length == 0 ) {
							this.todo.title = '',
							this.todo.currentId = ''
						} else {
							this.todo.currentId = this.list[0].id
							this.todo.title = this.list[0].title
							this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
						}
						this.$message(`Список "${listTitle}" успешно удалён!`)
					} catch(e) {
						console.log(e)
					}
				})
			},
			async deleteTodo(listId, id, title) {
				this.$prompt(`Удалить дело "${title}"?`, async () => {
					const update = {
						id: listId,
						progress: 0
					}
					try {
						await this.$store.dispatch('deleteTodo', { listId, id })

						for (let i = 0; i < this.todo.list.length; i++) {
							if ( this.todo.list[i].id == id ) {
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
				})
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
			async updateTodoProgress(listId, id, progress) {
				try {
					await this.$store.dispatch('switchTodoProgress', { listId, id, progress })
					for (let i = 0; i < this.todo.list.length; i++) {
						if ( this.todo.list[i].id == id ) {
							this.todo.list[i].progress = !this.todo.list[i].progress
						}
					}
					let flag = true,
						index
					for (let i = 0; i < this.todo.list.length; i++) {
						if ( !this.todo.list[i].progress ) {
							flag = false
						}
					}
					if ( flag ) {
						const update = {
							id: listId,
							progress: 2
						}
						await this.$store.dispatch('updateListProgress', update)
						for (let i = 0; i < this.list.length; i++) {
							if ( this.list[i].id == listId ) {
								this.list[i].progress = 2
							}
						}
					} else {
						const update = {
							id: listId,
							progress: 1
						}
						await this.$store.dispatch('updateListProgress', update)
						for (let i = 0; i < this.list.length; i++) {
							if ( this.list[i].id == listId ) {
								this.list[i].progress = 1
							}
						}
					}
				} catch(e) {
					console.log(e)
				}
			},
			async changeList(id, index) {
				try {
					this.todo.list = null
					this.todo.currentId = id
					this.todo.title = this.list[index].title
					this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
				} catch(e) {}
			},
			async createSubtask(listId, todoId) {
				this.$subtask(`Создать подзадачу?`, async (title) => {
					try {
						const info = {
							title, listId, todoId,
							date: new Date().toJSON()
						}
						const subtask = await this.$store.dispatch('createSubtask', info)
						for (let i = 0; i < this.todo.list.length; i++) {
							if ( this.todo.list[i].id == todoId ) {
								this.todo.list[i].subtasks.push(subtask)
							}
						}
						this.$message(`Подзадача "${subtask.title}" успешно добавлена!`)
					} catch(e) {}
				})
			},
			async deleteSubtask(listId, todoId, title, id) {
				this.$prompt(`Удалить подзадачу "${title}"`, async () => {
					try {
						await this.$store.dispatch('deleteSubtask', { listId, todoId, id })
						for (let i = 0; i < this.todo.list.length; i++) {
							if ( this.todo.list[i].id == todoId ) {
								for (let j = 0; j < this.todo.list[i].subtasks.length; j++) {
									if ( this.todo.list[i].subtasks[j].id == id ) {
										this.todo.list[i].subtasks.splice(j, 1)
									}
								}
							}
						}
					} catch(e) {}
				})
			}
		},
		components: {
			List, Todo, Footer, EditList, EditTodo
		}
	}
</script>
