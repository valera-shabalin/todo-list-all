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
			close.addEventListener('click', e => {
				e.preventDefault()
				document.body.removeChild(modal)
			})
		}
		Vue.prototype.$prompt = function(title, callback) {
			let modal = document.createElement('div')
			modal.innerHTML = ` 
				<div class="modal-window">
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-window__form">
									<a href="#" class="close">Закрыть</a>
									<h2>${title}</h2>
									<a href="#" class="btn btn_red js_yes">Да, удалить</a>
									<a href="#" class="btn btn_blue js_no">Нет, я передумал</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			`
			document.body.appendChild(modal)
			let close = document.body.querySelector('.modal-window .close'),
				yes = document.body.querySelector('.modal-window .js_yes'),
				no = document.body.querySelector('.modal-window .js_no')
			close.addEventListener('click', e => {
				e.preventDefault()
				document.body.removeChild(modal)
			})
			yes.addEventListener('click', async e => {
				e.preventDefault()
				document.body.removeChild(modal)
				callback()
			})
			no.addEventListener('click', e => {
				e.preventDefault()
				document.body.removeChild(modal)
			})
			return
		}
		Vue.prototype.$error = function(error) {
			let modal = document.createElement('div')
			modal.innerHTML = ` 
				<div class="modal-window">
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-window__form">
									<a href="#" class="close"">Закрыть</a>
									<h2>[Ошибка]: ${error}</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			`
			document.body.appendChild(modal)
			let close = document.body.querySelector('.modal-window .close')
			close.addEventListener('click', e => {
				e.preventDefault()
				document.body.removeChild(modal)
			})
		}
	}
}