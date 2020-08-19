import firebase from 'firebase/app'

export default {
	actions: {
		async createTodo({ dispatch, commit }, { title, listId, description, warn, progress, date }) {
			try {
				const uid = await dispatch('getUid')
				const todo = await firebase.database().ref(`/users/${uid}/lists/${listId}/todo`).push({ title, listId, description, warn, progress, date })
				return { title, listId, description, warn, progress, date, id: todo.key }
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async fetchTodo({ dispatch, commit }, listId) {
			try {
				const uid = await dispatch('getUid')
				const todo = (await firebase.database().ref(`/users/${uid}/lists/${listId}/todo`).once('value')).val() || {}
				const result = []
				Object.keys(todo).forEach(item => {
					if ( todo[item].listId == listId ) {
						todo[item].id = item
						let subtasks = []
						if ( todo[item].subtasks !== undefined ) {
							Object.keys(todo[item].subtasks).forEach(sub => {
								todo[item].subtasks[sub].id = sub
								subtasks.push(todo[item].subtasks[sub])
							})
						}
						todo[item].subtasks = subtasks
						result.push(todo[item])
					}
				})
				return result
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async deleteTodo({ dispatch, commit }, { listId, id }) {
			try {
				const uid = await dispatch('getUid')
				firebase.database().ref(`/users/${uid}/lists/${listId}/todo/${id}`).remove()
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async switchTodoWarn({ dispatch, commit }, { listId, id, warn }) {
			warn = !warn
			try {
				const uid = await dispatch('getUid')
				firebase.database().ref(`/users/${uid}/lists/${listId}/todo/${id}`).update({warn})
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async switchTodoProgress({ dispatch, commit }, { listId, id, progress }) {
			progress = !progress
			try {
				const uid = await dispatch('getUid')
				firebase.database().ref(`/users/${uid}/lists/${listId}/todo/${id}`).update({progress})
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async updateTodoData({ dispatch, commit }, { id, listId, title, description }) {
			try {
				const uid = await dispatch('getUid')
				firebase.database().ref(`/users/${uid}/lists/${listId}/todo/${id}`).update({ title, description })
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}