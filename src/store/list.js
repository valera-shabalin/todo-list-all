import firebase from 'firebase/app'

export default {
	actions: {
		async createList({ dispatch, commit }, { title, progress }) {
			try {
				const uid = await dispatch('getUid')
				const list = await firebase.database().ref(`/users/${uid}/list`).push({ title, progress })
				return { title, progress, id: list.key }
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async fetchLists({ dispatch, commit }) {
			try {
				const uid = await dispatch('getUid')
				const list = (await firebase.database().ref(`/users/${uid}/list`).once('value')).val() || {}
				return Object.keys(list).map(key => ({ ...list[key], id: key }))
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}