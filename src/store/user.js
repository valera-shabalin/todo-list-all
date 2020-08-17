import firebase from 'firebase/app'

export default {
	actions: {
		async getUserInfo({ dispatch, commit }) {
			try {
				const uid = await dispatch('getUid')
				return (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
			} catch(e) {
				commit('setError', e)
				throw e
			}
		},
		async changeInfo({ dispatch, commit }, info) {
			try {
				const uid = await dispatch('getUid')
				await firebase.database().ref(`/users/${uid}/info`).set(info)
			} catch(e) {
				commit('setError', e)
				throw e
			}
		}
	}
}