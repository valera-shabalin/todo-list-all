<template>
	<section class="user-settings">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-6">
					<h1>Ваш профиль</h1>
					<form @submit.prevent="changeInfo">
						<input 
							type="name" 
							class="default-input" 
							placeholder="Ваше имя" 
							v-model.trim="name"
							:class="{ invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength) }"
						/>
						<input 
							type="surname" 
							class="default-input" 
							placeholder="Ваша фамилия"
							v-model.trim="surname"
							:class="{ invalid: ($v.surname.$dirty && !$v.surname.required) || ($v.surname.$dirty && !$v.surname.minLength) }"
						/>
						<input type="submit" class="btn btn_blue" value="Сохранить">
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { required, minLength, email } from 'vuelidate/lib/validators'
	import firebase from 'firebase/app'

	export default {
		name: 'Edit',
		data: () => ({
			name: '',
			surname: ''
		}),
		validations: {
			name: { required, minLength: minLength(3) },
			surname: { required, minLength: minLength(3) }
		},
		async mounted() {
			const info = await this.$store.dispatch('getInfo')
			this.name = info.name
			this.surname = info.surname
		},
		methods: {
			async changeInfo() {
				if ( this.$v.$invalid ) {
			    	this.$v.$touch()
			       	return
			    }
			    const user = {
			    	name: this.name,
			    	surname: this.surname
			    }
			    try {
			    	await this.$store.dispatch('updateInfo', user)
			    	alert('Изменения сохранены!')
			    } catch(e) {}
			}
		}
	}
</script>