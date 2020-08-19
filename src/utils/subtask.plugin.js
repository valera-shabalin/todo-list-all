export default {
	install(Vue, options) {
		Vue.prototype.$subtask = function(title, callback) {
			let modal = document.createElement('div')
			modal.innerHTML = ` 
				<div class="modal-window">
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-window__form">
									<a href="#" class="close">Закрыть</a>
									<h2>${title}</h2>
									<form>
										<input type="text" class="default-input js_title-subtask" placeholder="Название новой подзадачи">
										<a href="#" class="btn btn_blue js_create-subtask">Добавить</a>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			`
			document.body.appendChild(modal)
			let btn = document.body.querySelector('.modal-window .js_create-subtask'),
				close = document.body.querySelector('.modal-window .close'),
				input = document.body.querySelector('.modal-window .js_title-subtask')
			close.addEventListener('click', e => {
				e.preventDefault()
				document.body.removeChild(modal)
			})
			btn.addEventListener('click', async e => {
				e.preventDefault()
				if ( !input.value ) {
					input.classList.add('invalid')
					return
				}
				document.body.removeChild(modal)
				callback(input.value)
			})
			return
		}
	}
}