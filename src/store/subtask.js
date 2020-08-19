import firebase from 'firebase/app'

export default {
	actions: {
		async createSubtask({ dispatch, commit }, { title, listId, todoId, todoTitle, date }) {
			try {
				const uid = await dispatch('getUid')
				const subtask = await firebase.database().ref(`/users/${uid}/lists/${listId}/todo/${todoId}/subtasks`).push({ title, listId, todoId, todoTitle, date })
				return { title, listId, todoId, todoTitle, date, id: subtask.key }
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}