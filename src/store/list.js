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
				const list = (await firebase.database().ref(`/users/${uid}/lists`).once('value')).val() || {}
				return Object.keys(list).map(key => ({ ...list[key], id: key }))
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async deleteList({ dispatch, commit }, id) {
			try {
				const uid = await dispatch('getUid')
				firebase.database().ref(`/users/${uid}/lists/${id}`).remove()
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async updateListProgress({ dispatch, commit }, { id, progress }) {
			try {
				const uid = await dispatch('getUid')
				firebase.database().ref(`/users/${uid}/lists`).child(`${id}`).update({progress})
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async deleteAllLists({ dispatch, commit }) {
			try {
				const uid = await dispatch('getUid')
				firebase.database().ref(`/users/${uid}/lists`).remove()
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}