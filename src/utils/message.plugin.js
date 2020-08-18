export default {
	install(Vue, options) {
		Vue.prototype.$message = function(title) {
			let modal = document.createElement('div')
			modal.innerHTML = ` 
				<div class="modal-window">
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-window__form">
									<a href="#" class="close"">Закрыть</a>
									<h2>${title}</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			`
			document.body.appendChild(modal)
			let close = document.body.querySelector('.modal-window .close')
			close.addEventListener('click', (e) => {
				e.preventDefault()
				document.body.removeChild(modal)
			}) 
		}

		Vue.prototype.$error = function(html) {
			console.log(html)
		}
	}
}