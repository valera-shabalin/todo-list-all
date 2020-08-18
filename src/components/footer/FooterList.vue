<template>
	<div class="footer__list">
		<form class="list-form" @submit.prevent="createList">
			<input 
				type="text" 
				class="default-input" 
				placeholder="Название нового списка"
				v-model.trim="title"
				:class="{ invalid: $v.title.$dirty && !$v.title.required }"
			/>
			<button class="btn_add">
				<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'><title>ionicons-v5-a</title><line x1='256' y1='112' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='400' y1='256' x2='112' y2='256' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
			</button>
		</form>
	</div>
</template>

<script>
	import { required } from 'vuelidate/lib/validators'

	export default {
		name: 'FooterList',
		data: () => ({
			title: ''
		}),
		validations: {
			title: { required }
		},
		methods: {
			async createList() {
				if ( this.$v.$invalid ) {
			    	this.$v.$touch()
			       	return
			    }
			    const info = {
			    	title: this.title,
			    	date: new Date().toJSON()
			    }
			    try {
			    	const list = await this.$store.dispatch('createList', info)
			    	this.title = ''
			    	this.$emit('addList', list)
			    	alert('Новый список успешно создан!')
			    } catch(e) {}
			}
		}
	}
</script>