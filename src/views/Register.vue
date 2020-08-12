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
						type="text" 
						class="default-input" 
						placeholder="Придумайте пароль"
						v-model.trim="password" 
						:class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }" 
					/>
					<input type="submit" class="btn btn_green" value="Зарегистрироваться"> 
					<span 
						class="error"
						v-if="$v.name.$dirty && !$v.name.required"
					>Введите ваше имя</span>
					<span 
						class="error"
						v-if="$v.name.$dirty && !$v.name.required"
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
	import { email, required, minLength } from 'vuelidate/lib/validators'
	export default {
		name: 'Register',
		data: () => ({
			email: '',
			password: '',
			name: '',
			surname: ''
		}),
		validations: {
		    email: { email, required },
		    password: { required, minLength: minLength(10) },
		    name: { required },
		    surname: { required }
	    },
		methods: {
			onSubmit() {
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
			    console.log(formData)
				this.$router.push('/')
			}
		}
	}
</script>