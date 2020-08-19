import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import list from './list'
import todo from './todo'
import subtask from './subtask'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		error: null
	},
	mutations: {
		setError(state, error) {
			state.error = error
		},
		clearError(state) {
			state.error = null
		}
	},
	getters: {
		error: s => s.error
	},
	actions: {

	},
	modules: {
		auth, user, list, todo, subtask
	}
})
