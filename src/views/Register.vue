<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-6">	
				<form @submit.prevent="onSubmit">
					<span class="logo">Todo</span>
					<input 
						type="text" 
						class="default-input" 
						placeholder="Ваше имя"
						v-model.trim="name"
						:class="{ invalid: ($v.name.$dirty && !$v.name.required) }"
					/>
					<input 
						type="text" 
						class="default-input" 
						placeholder="Ваша фамилия"
						v-model.trim="surname"
						:class="{ invalid: ($v.surname.$dirty && !$v.surname.required) }"
					/>
					<input 
						type="text" 
						class="default-input user-email" 
						placeholder="Ваш адрес электронной почты" 
						v-model.trim="email" 
						:class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }" 
					/>
					<input 
						type="password" 
						class="default-input" 
						placeholder="Придумайте пароль"
						v-model.trim="password" 
						:class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }" 
					/>
					<input 
						type="password" 
						class="default-input" 
						placeholder="Повторите пароль"
						v-model.trim="repeatPassword" 
						:class="{ invalid: ($v.repeatPassword.$dirty && !$v.repeatPassword.required) || ($v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword) }" 
					/>
					<input type="submit" class="btn btn_green" value="Зарегистрироваться"> 
					<span 
						class="error"
						v-if="$v.name.$dirty && !$v.name.required"
					>Введите ваше имя</span>
					<span 
						class="error"
						v-if="$v.surname.$dirty && !$v.surname.required"
					>Введите вашу фамилию</span>
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
					<span 
						class="error"
						v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.required"
					>Повторите пароль</span>
					<span 
						class="error"
						v-else-if="$v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword"
					>Пароли не совпадают</span>
					<div class="to-login">
						<span>Уже есть аккаунт? </span>
						<router-link to="/login">Войдите!</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'
	export default {
		name: 'Register',
		data: () => ({
			email: '',
			password: '',
			repeatPassword: '',
			name: '',
			surname: ''
		}),
		validations: {
		    email: { email, required },
		    password: { required, minLength: minLength(10) },
		    repeatPassword: { required, sameAsPassword: sameAs('password') },
		    name: { required },
		    surname: { required }
	    },
		methods: {
			async onSubmit() {
				if ( this.$v.$invalid ) {
			    	this.$v.$touch()
			       	return
			    }
			    const formData = {
			    	email: this.email,
			    	password: this.password,
			    	name: this.name,
			    	surname: this.surname
			    }
			   	try {
			   		 await this.$store.dispatch('register', formData)
					this.$router.push('/')
			   	} catch(e) {}
			}
		}
	}
</script>