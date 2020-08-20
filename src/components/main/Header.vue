<template>
	<header class="header">
		<div class="container-fluid">
			<div class="row align-items-center">
				<div class="col-10 d-flex align-items-center">
					<div class="header__logo">
						<span class="logo">Todo</span>
					</div>
					<div class="header__date">
						<span> - {{ date | date('date') }}</span>
					</div>
				</div>
				<div class="col-2 d-flex justify-content-end">
					<div class="header__humb" :class="{ js_open: humb }" @click="openMenu">
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
		data: () => ({
			interval: null,
			date: new Date(),
			timeInterval: 36000,
			humb: false
		}),
		methods: {
			openMenu() {
				this.humb = !this.humb
				this.$emit('openMenu')
			}
		},
		mounted() {
			this.interval = setInterval(() => {
				this.date = new Date()
			}, this.timeInterval)
		},
		beforeDestroy() {
			clearInterval(this.interval)
		}
	}
</script>