<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-6">	
				<form>
					<span class="logo">Todo</span>
					<input type="text" class="default-input" placeholder="Ваше имя">
					<input type="text" class="default-input" placeholder="Ваша фамилия">
					<input type="text" class="default-input" placeholder="Ваш адрес электронной почты">
					<input type="password" class="default-input" placeholder="Придумайте пароль">
					<input type="password" class="default-input" placeholder="Повторите пароль">
					<input type="submit" class="btn btn_green" value="Зарегистрироваться"> 
					<!-- <span class="error">Пароль должен содержать более 6 символов</span> -->
					<div class="to-login">
						<span>Уже есть аккаунт?</span>
						<a href="#">Войдите!</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>