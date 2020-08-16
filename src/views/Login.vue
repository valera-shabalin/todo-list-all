<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-6">	
				<form @submit.prevent="onSubmit">
					<span class="logo">Todo</span>
					<input 
						type="email" 
						class="default-input user-email" 
						placeholder="Ваш адрес электронной почты" 
						v-model.trim="email" 
						:class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }" 
					/>
					<input 
						type="password" 
						class="default-input" 
						placeholder="Ваш пароль"
						v-model.trim="password" 
						:class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }" 
					/>
					<input type="submit" class="btn btn_blue" value="Войти"> 
					<span 
						class="error"
						v-if="$v.email.$dirty && !$v.email.required"
					>Введите адрес электронной почты</span>
					<span 
						class="error"
						v-else-if="$v.email.$dirty && !$v.email.email"
					>Некорректный адрес электронной почты</span>
					<span 
						class="error"
						v-if="$v.password.$dirty && !$v.password.required"
					>Введите пароль</span>
					<span 
						class="error"
						v-else-if="$v.password.$dirty && !$v.password.minLength"
					>Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов. Сейчас он равен {{ password.length }} символам</span>
					<div class="to-login">
						<span>Нет аккаутна? </span>
						<router-link to="/register">Зарегистрируйтесь!</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { email, required, minLength } from 'vuelidate/lib/validators'
	
	export default {
		name: 'Login',
		data: () => ({
			email: '',
			password: '',
		}),
		validations: {
		    email: { email, required },
		    password: { required, minLength: minLength(10) }
	    },
		methods: {
			async onSubmit() {
				if ( this.$v.$invalid ) {
			    	this.$v.$touch()
			       	return
			    }
			    const formData = {
			    	email: this.email,
			    	password: this.password
			    }

			    try {
			    	await this.$store.dispatch('login', formData)
			    	this.$router.push('/')
			    } catch(e) {}
			}
		}
	}
</script>