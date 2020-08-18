<template>
	<div class="main__list">
		<h2>Ваши списки дел</h2>

		<div 
			class="main__list-item"
			v-for="(list, index) of value"
			:key="list.id"
			:class="{ green: list.progress == 1, grey: list.progress == 2 }"
			@click="$emit('changeList', list.id, index)">
			<h3>{{ list.title }}</h3>
			<a href="#" class="item_btn del" @click.prevent="deleteList(list.id)">
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
				<span>Удалить</span>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'List',
		props: ['value'],
		methods: {
			async deleteList(id) {
				try {
					await this.$store.dispatch('deleteList', id)
					this.$emit('deleteList', id)
					alert('Список успешно удалён!')
				} catch(e) {}
			}
		}
	}
</script>
