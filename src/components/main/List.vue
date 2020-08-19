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
			<a href="#" class="item_btn edit" @click.prevent="$emit('editList', item.id, item.title, index)">
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-h</title><path d='M452.37,59.63h0a40.49,40.49,0,0,0-57.26,0L184,294.74c23.08,4.7,46.12,27.29,49.26,49.26L452.37,116.89A40.49,40.49,0,0,0,452.37,59.63Z' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><path d='M138,336c-29.88,0-54,24.5-54,54.86,0,23.95-20.88,36.57-36,36.57C64.56,449.74,92.82,464,120,464c39.78,0,72-32.73,72-73.14C192,360.5,167.88,336,138,336Z' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
				<span>Изменить</span>
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
