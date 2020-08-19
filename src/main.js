/* Include libs and plugins */
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'

/* Include Firebase */
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '@/config/firebase-config'

/* Include global components */
import Loader from '@/components/app/Loader'

/* Include filters */
import dateFilter from '@/filters/date.filter'

Vue.config.productionTip = false

/* Add plugins */
Vue.use(Vuelidate)
Vue.use(messagePlugin)

/* Add filters */
Vue.filter('date', dateFilter)

/* Register Vue components */
Vue.component('Loader', Loader)

/* Include Firebase to project */
firebase.initializeApp(firebaseConfig())

/* Initialization application */
let app
firebase.auth().onAuthStateChanged(() => {
	if ( !app ) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
})


