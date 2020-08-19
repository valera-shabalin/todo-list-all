<template>
	<div class="modal-window" v-if="!prompt.hidden">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<div class="modal-window__form">
						<a href="#" class="close" @click.prevent="prompt.allow = prompt.allow">Закрыть</a>
						<h2>{{ prompt.title }}</h2>
						<a href="#" class="btn btn_red" @click.prevent="prompt.allow = !prompt.allow">Да, удалить</a>
						<a href="#" class="btn btn_blue" @click.prevent="prompt.allow = prompt.allow">Нет, я передумал</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Prompt',
		props: {
			prompt: {
				type: Object,
				default: []
			}
		}
	}
</script>