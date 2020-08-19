<template>
	<div class="main__list">
		<h2>Ваши списки дел</h2>

		<span v-if="!list.length">У вас нет дел</span>

		<div 
			class="main__list-item"
			v-for="(item, index) of list"
			:key="item.id"
			:class="{ green: item.progress == 1, grey: item.progress == 2 }"
			@click="$emit('changeList', item.id, index)" v-else>
			<h3>{{ item.title }}</h3>
			<a href="#" class="item_btn del" @click.prevent="$emit('deleteList', item.id, item.title)">
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
				<span>Удалить</span>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'List',
		props: {
			list: {
				type: Array,
				default: []
			}
		}
	}
</script>
