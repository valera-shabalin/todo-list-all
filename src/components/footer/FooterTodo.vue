<template>
	<div class="footer__affairs">
		<form class="affairs-form" @submit.prevent="createTodo">
			<input 
				type="text" 
				class="default-input" 
				placeholder="Название нового дела"
				v-model.trim="title"
				:class="{ invalid: ($v.title.$dirty && $v.title.required) || ($v.title.$dirty && $v.title.maxLength) }"
			/>
			<textarea 
				class="default-input" 
				rows="1" 
				placeholder="Описание нового дела"
				v-model.trim="description"
			></textarea>
			<button class="btn_add">
				<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'><title>ionicons-v5-a</title><line x1='256' y1='112' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='400' y1='256' x2='112' y2='256' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
			</button>
			<div class="warn">
				<label for="new-affair-warn">Срочное дело</label>
				<input 
					type="checkbox" 
					id="new-affair-warn"
					v-model.trim="warn"
				/>
			</div>
		</form>
	</div>
</template>

<script>
	import { required, maxLength } from 'vuelidate/lib/validators'

	export default {
		name: 'FooterTodo',
		props: {
			todo: {
				type: Object,
				default: {}
			}
		},
		data: () => ({
			title: '',
			description: '',
			warn: false
		}),
		validations: {
			title: { required, maxLength: maxLength(50) }
		},
		methods: {
			async createTodo() {
				if ( this.$v.$invalid ) {
			    	this.$v.$touch()
			       	return
			    }
			    const info = {
			    	title: this.title,
			    	listId: this.todo.currentId,
			    	description: this.description,
			    	warn: this.warn,
			    	progress: false,
			    	date: new Date().toJSON()
			    }
			   	try {
			    	const todo = await this.$store.dispatch('createTodo', info)
			    	this.title = ''
			    	this.description = ''
			    	warn: false
			    	this.$v.$reset()
			    	this.$emit('addTodo', todo)
			    } catch(e) {}
			}
		}
	}
</script>