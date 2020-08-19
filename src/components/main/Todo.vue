<template>
	<div class="main__affairs">
		<h1>{{ todo.title }}</h1>

		<div 
			class="main__affairs-item"
			v-for="item of todo.list"
			v-if="todo.currentId">
			<div class="body" :class="{ green: item.progress }">
				<div class="content">
					<h3>{{ item.title }}</h3>
					<p>{{ item.description }}</p>
					<div class="info">
						<span class="date">{{ item.date | date('datetime') }}</span>
						<span class="warn" v-if="item.warn"></span>
					</div>
				</div>
				<div class="item_btn del" @click.prevent="$emit('deleteTodo', item.listId, item.id, item.title)">
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
					<span>Удалить</span>
				</div>
				<div class="item_btn warn" @click.prevent="$emit('updateWarn', item.listId, item.id, item.warn)">
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-a</title><path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' style='fill:none;stroke-miterlimit:10;stroke-width:32px'/><path d='M250.26,166.05,256,288l5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,166.05Z' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><path d='M256,367.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Z'/></svg>
					<span v-if="item.warn">Неважное дело</span>
					<span v-else>Важное дело</span>
				</div>
				<div class="item_btn ready" @click.prevent="$emit('updateTodoProgress', item.listId, item.id, item.progress)">
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' style='fill:none;stroke-miterlimit:10;stroke-width:32px'/><polyline points='368 192 256.13 320 208.18 272' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='191.95' y1='320' x2='144' y2='272' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='305.71' y1='192' x2='254.16' y2='251' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
					<span v-if="item.progress">Не готово</span>
					<span v-else>Готово</span>
				</div>
				<div class="item_btn add-item" @click.prevent="$emit('createSubtask', item.listId, item.id)">
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-a</title><line x1='256' y1='112' x2='256' y2='400' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='400' y1='256' x2='112' y2='256' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
					<span>Добавить подзадачу</span>
				</div>
				<a href="#" class="item_btn edit"">
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-h</title><path d='M452.37,59.63h0a40.49,40.49,0,0,0-57.26,0L184,294.74c23.08,4.7,46.12,27.29,49.26,49.26L452.37,116.89A40.49,40.49,0,0,0,452.37,59.63Z' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><path d='M138,336c-29.88,0-54,24.5-54,54.86,0,23.95-20.88,36.57-36,36.57C64.56,449.74,92.82,464,120,464c39.78,0,72-32.73,72-73.14C192,360.5,167.88,336,138,336Z' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
					<span>Изменить</span>
				</a>
			</div>
			<div class="under-items">
				<div 
					class="item"
					v-for="sub of item.subtasks"
					:key="sub.id">
					<h3>{{ sub.title }}</h3>
					<a href="#" class="item_btn del" @click.prevent="$emit('deleteSubtask', item.listId, item.id, sub.title, sub.id)">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
						<span>Удалить</span>
					</a>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'Todo',
		props: {
			todo: {
				type: Object,
				default: {}
			}
		}
	}
</script>