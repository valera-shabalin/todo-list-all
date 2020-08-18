import firebase from 'firebase/app'

export default {
	actions: {
		async createList({ dispatch, commit }, { title, progress, date }) {
			try {
				const uid = await dispatch('getUid')
				const list = await firebase.database().ref(`/users/${uid}/lists`).push({ title, progress, date })
				return { title, progress, date, id: list.key }
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async fetchLists({ dispatch, commit }) {
			try {
				const uid = await dispatch('getUid')
				const list = (await firebase.database().ref(`/users/${uid}/lists`).once('value')).val()
				return Object.keys(list).map(key => ({ ...list[key], id: key }))
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}