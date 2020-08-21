<template>
	<div>
		<EditList v-model="editListData.hidden">
			<a href="#" class="close" @click.prevent="closeEditList">Закрыть</a>
			<h2>{{ editListData.title }}</h2>
			<form @submit.prevent="updateListData">
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
			async updateListData() { // функция обновления данных списка
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
			async updateTodoData() { // функция обновления данных задачи
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
			async addList(list) { // функция добавления нового списка
				this.list.push(list)
				this.todo.title = list.title
				this.todo.currentId = list.id
				try {
					this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
					this.$message(`Список "${list.title}" успешно добавлен!`)
				} catch(e) {}
			},
			async addTodo(todoItem) { // функция добавления задачи в текущий список
				this.todo.list.push(todoItem)
				try {
					const update = {
						id: todoItem.listId,
						progress: 1
					}
					await this.$store.dispatch('updateListProgress', update)
					this.updateListProgress(this.todo.currentId, 1)
					this.$message(`Дело "${todo.title}" успешно добавлено!`)
				} catch(e) {}
			},
			async deleteList(id, listTitle) { // функция для удаления списка
				this.$prompt(`Удалить список "${listTitle}?"`, async () => {
					try {
						/* Удаление списка */
						await this.$store.dispatch('deleteList', id)
						for ( let i = 0; i < this.list.length; i++ ) {
							if ( this.list[i].id == id ) {
								this.list.splice(i, 1)
							}
						}
						/* Переключение активного списка */
						if ( this.list.length == 0 ) {
							this.todo.title = '',
							this.todo.currentId = ''
							this.todo.list = []
						} else {
							this.todo.currentId = this.list[0].id
							this.todo.title = this.list[0].title
							this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
						}
						/* Вывод сообщения об успехе */
						this.$message(`Список "${listTitle}" успешно удалён!`)
					} catch(e) {}
				})
			},
			async deleteTodo(listId, id, title) { // функция для удаления задачи текущего списка
				this.$prompt(`Удалить дело "${title}"?`, async () => {
					try {
						/* Удаление элемента */
						await this.$store.dispatch('deleteTodo', { listId, id })
						for (let i = 0; i < this.todo.list.length; i++) {
							if ( this.todo.list[i].id == id ) {
								this.todo.list.splice(i, 1)
							}
						}
						/* Обновление состояния текущего списка */
						let update = {
							id: listId,
							progress: 0
						}
						if ( this.todo.list.length == 0 ) {
							await this.$store.dispatch('updateListProgress', update)
							this.updateListProgress(this.todo.currentId, 0)
						} else {
							update.progress = 2
							for (let i = 0; i < this.todo.list.length; i++) {
								if ( !this.todo.list[i].progress ) {
									update.progress = 1
								}
							}
							await this.$store.dispatch('updateListProgress', update)
							this.updateListProgress(this.todo.currentId, update.progress)
						}
						/* Вывод сообщения об успехе */
						this.$message(`Дело "${title}" успешно удалено!`)
					} catch(e) {}
				})
			},
			async updateListProgress(id, progress) { // функция для обновления прогресса списка
				for (let i = 0; i < this.list.length; i++) {
					if ( this.list[i].id == id ) {
						this.list[i].progress = progress
					}
				}
			},
			async updateWarn(listId, id, warn) { // функция для обновления важности задачи
				try {
					await this.$store.dispatch('switchTodoWarn', { listId, id, warn })
					for (let i = 0; i < this.todo.list.length; i++) {
						if ( this.todo.list[i].id == id ) {
							this.todo.list[i].warn = !this.todo.list[i].warn
						}
					}
				} catch(e) {}
			},
			async updateTodoProgress(listId, id, progress) { // функция для обновления прогресса задачи
				try {
					/* Обновление прогресса задачи */
					await this.$store.dispatch('switchTodoProgress', { listId, id, progress })
					for (let i = 0; i < this.todo.list.length; i++) {
						if ( this.todo.list[i].id == id ) {
							this.todo.list[i].progress = !this.todo.list[i].progress
						}
					}
					/* Обновление прогресса текущего списка */
					let update = {
						id: listId,
						progress: 2
					}
					for (let i = 0; i < this.todo.list.length; i++) {
						if ( !this.todo.list[i].progress ) {
							update.progress = 1
						}
					}
					await this.$store.dispatch('updateListProgress', update)
					this.updateListProgress(this.todo.currentId, update.progress)
				} catch(e) {}
			},
			async changeList(id, index) { // Функция смены текущего списка
				try {
					/* Замена данных текущего списка */
					this.todo.list = []
					this.todo.currentId = id
					this.todo.title = this.list[index].title
					this.todo.list = await this.$store.dispatch('fetchTodo', this.todo.currentId)
				} catch(e) {}
			},
			async createSubtask(listId, todoId) { // Функция для добавления подзадачи
				this.$subtask(`Создать подзадачу?`, async (title) => {
					try {
						/* Добавление подзадачи */
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
						/* Вывод сообщения об успехе */
						this.$message(`Подзадача "${subtask.title}" успешно добавлена!`)
					} catch(e) {}
				})
			},
			async deleteSubtask(listId, todoId, title, id) { // функция для удаления подзадачи
				this.$prompt(`Удалить подзадачу "${title}"`, async () => {
					try {
						/* Удаление подзадачи */
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
						/* Вывод сообщения об успехе */
						this.$message(`Подзадача "${subtask.title}" успешно удалена!`)
					} catch(e) {}
				})
			}
		},
		components: {
			List, Todo, Footer, EditList, EditTodo
		}
	}
</script>
