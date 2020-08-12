<template>
	<header class="header">
		<div class="container-fluid">
			<div class="row align-items-center">
				<div class="col-6">
					<div class="header__logo">
						<span class="logo">Todo</span>
					</div>
				</div>
				<div class="col-6 d-flex justify-content-end">
					<div class="header__humb" :class="{js_open: value}" @click="$emit('click')">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		props: ['value']
	}
</script>