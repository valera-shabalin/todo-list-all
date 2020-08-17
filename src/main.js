import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import dateFilter from '@/filters/date.filter'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader.vue'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '@/config/firebase-config'

Vue.config.productionTip = false

/* Add plugins */
Vue.use(Vuelidate)

/* Add filters */
Vue.filter('date', dateFilter)

/* Register Vue components */
Vue.component('Loader', Loader)

/* Include Firebase to project */
firebase.initializeApp(firebaseConfig())

let app

/* Initialization application */
firebase.auth().onAuthStateChanged(() => {
	if ( !app ) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
})


