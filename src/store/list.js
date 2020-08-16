import firebase from 'firebase/app'

export default {
	actions: {
		async createList({ dispatch, commit }, { title }) {
			try {
				const uid = await dispatch('getUid')
				const list = await firebase.database().ref(`/users/${uid}/list`).push({ title })
				return { title, id: list.key }
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}