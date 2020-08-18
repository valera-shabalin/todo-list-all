export default {
	install(Vue, options) {
		Vue.prototype.$message = function(html) {
			console.log(html)
		}

		Vue.prototype.$error = function(html) {
			console.log(html)
		}
	}
}