import firebase from 'firebase/app'

export default {
	actions: {
		async getInfo({ dispatch, commit }) {
			try {
				const uid = await dispatch('getUid')
				const user = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
				return user 
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async updateInfo({ dispatch, commit }, { name, surname }) {
			try {
				const uid = await dispatch('getUid')
				await firebase.database().ref(`/users/${uid}/info`).set({ name, surname })
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}