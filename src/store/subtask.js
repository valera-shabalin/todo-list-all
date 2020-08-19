import firebase from 'firebase/app'

export default {
	actions: {
		async createSubtask({ dispatch, commit }, { title, listId, todoId, date }) {
			try {
				const uid = await dispatch('getUid')
				const subtask = await firebase.database().ref(`/users/${uid}/lists/${listId}/todo/${todoId}/subtasks`).push({ title, listId, todoId, date })
				return { title, listId, todoId, date, id: subtask.key }
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async deleteSubtask({ dispatch, commit }, { listId, todoId, id }) {
			try {
				const uid = await dispatch('getUid')
				await firebase.database().ref(`/users/${uid}/lists/${listId}/todo/${todoId}/subtasks/${id}`).remove()
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}