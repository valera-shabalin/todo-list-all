<template>
	<section class="user-settings" v-else>
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-6">
					<h1>Ваш профиль</h1>
					<Loader v-if="loading" />
					<form @submit.prevent="changeInfo" v-else>
						<input 
							type="text" 
							class="default-input" 
							placeholder="Ваше имя"
							v-model.trim="name"
							:class="{ invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength) }"
						/>
						<input 
							type="text" 
							class="default-input" 
							placeholder="Ваша фамилия" 
							value="Шабалин"
							v-model.trim="surname"
							:class="{ invalid: ($v.surname.$dirty && !$v.surname.required) || ($v.surname.$dirty && !$v.surname.minLength) }"
						>
						<input type="submit" class="btn btn_blue" value="Сохранить">
						<a href="#" class="btn btn_red" @click.prevent="deleteAll">Удалить все списки</a>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { required, minLength } from 'vuelidate/lib/validators'

	export default {
		name: 'Edit',
		data: () => ({
			loading: true,
			name: '',
			surname: ''
		}),
		validations: {
			name: { required, minLength: minLength(3) },
			surname: { required, minLength: minLength(3) }
		},
		async mounted() {
			const info = await this.$store.dispatch('getUserInfo')
			this.name = info.name
			this.surname = info.surname
			this.loading = false
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
			    	await this.$store.dispatch('changeInfo', user)
			    } catch(e) {}
			    alert('Информация успешно обновлена!')
			},
			async deleteAll() {
				await this.$store.dispatch('deleteAllLists')
				alert('Все списки были успешно удалены!')
			}
		}
	}
</script>