<template>
	<div class="main__affairs">

		<Loader v-if="loading" />

		<div v-else>
			<h1>{{ titleAffairs }}</h1>
			
			<!-- <div class="main__affairs-item">
				<div class="body green">
					<div class="content">
						<h3>Заправить машину</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim ipsum dolor reiciendis eos maiores, nulla inventore, praesentium unde quibusdam molestias, ad neque architecto odit? Tempora soluta amet nemo iure, excepturi quas dolor vitae laborum repellendus, rerum ab a ipsa perferendis facere magnam delectus magni, dolorum ullam minima enim laboriosam blanditiis quae, odit? Tempora maxime ipsum numquam assumenda eveniet, nobis sunt, eligendi. Veniam cupiditate molestias officia facilis deleniti, temporibus pariatur assumenda molestiae debitis hic. Aliquid provident distinctio voluptatibus enim beatae earum ea eum id est possimus sunt nulla tempore reiciendis, labore saepe hic omnis, cum sapiente inventore adipisci? Dolores cumque tempora tempore magni quasi itaque deleniti. Dicta incidunt nesciunt, perferendis. Ex eos, neque totam aperiam voluptate voluptatum saepe fugit alias magni corrupti. Quaerat delectus recusandae magni dicta, eveniet deleniti quidem quas, pariatur libero repellendus odit quibusdam ut maxime, distinctio ratione fugit reprehenderit sapiente aliquam, quos eligendi explicabo similique accusantium aperiam. Ipsa iste libero quod animi hic, veniam ullam maiores nesciunt possimus temporibus id in, est enim consectetur. Quia minus natus exercitationem ducimus repudiandae sunt cupiditate culpa, quis quo illum! Explicabo quas optio quia consectetur sit, ipsum earum tempore, praesentium perferendis. Voluptatum ipsum natus nemo harum. Rerum officiis deleniti commodi numquam voluptatum!</p>
						<div class="info">
							<span class="date">06.08.2020 - 12.32</span>
						</div>
					</div>
					<div class="item_btn del">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
						<span>Удалить</span>
					</div>
					<div class="item_btn warn">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-a</title><path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' style='fill:none;stroke-miterlimit:10;stroke-width:32px'/><path d='M250.26,166.05,256,288l5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,166.05Z' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><path d='M256,367.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Z'/></svg>
						<span>Важное дело</span>
					</div>
					<div class="item_btn ready">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' style='fill:none;stroke-miterlimit:10;stroke-width:32px'/><polyline points='368 192 256.13 320 208.18 272' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='191.95' y1='320' x2='144' y2='272' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='305.71' y1='192' x2='254.16' y2='251' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
						<span>Готово</span>
					</div>
					<div class="item_btn add-item">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-a</title><line x1='256' y1='112' x2='256' y2='400' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='400' y1='256' x2='112' y2='256' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
						<span>Добавить подзадачу</span>
					</div>
				</div>
				<div class="under-items">
					<div class="item grey">
						<h3>Заехать на заправку</h3>
						<a href="#" class="item_btn del">
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
							<span>Удалить</span>
						</a>
					</div>
					<div class="item green">
						<h3>Заправить машину</h3>
						<a href="#" class="item_btn del">
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
							<span>Удалить</span>
						</a>
					</div>
					<div class="item green">
						<h3>Выехать с заправки</h3>
						<a href="#" class="item_btn del">
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
							<span>Удалить</span>
						</a>
					</div>
				</div>
			</div> -->
			<!-- <div class="main__affairs-item">
				<div class="body grey">
					<div class="content">
						<h3>Заправить машину</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim ipsum dolor reiciendis eos maiores, nulla inventore, praesentium unde quibusdam molestias, ad neque architecto odit? Tempora soluta amet nemo iure, excepturi quas dolor vitae laborum repellendus, rerum ab a ipsa perferendis facere magnam delectus magni, dolorum ullam minima enim laboriosam blanditiis quae, odit? Tempora maxime ipsum numquam assumenda eveniet, nobis sunt, eligendi. Veniam cupiditate molestias officia facilis deleniti, temporibus pariatur assumenda molestiae debitis hic.</p>
						<div class="info">
							<span class="date">06.08.2020 - 12.32</span>
							<span class="warn"></span>
						</div>
					</div>
					<div class="item_btn del">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
						<span>Удалить</span>
					</div>
					<div class="item_btn warn">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-a</title><path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' style='fill:none;stroke-miterlimit:10;stroke-width:32px'/><path d='M250.26,166.05,256,288l5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,166.05Z' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><path d='M256,367.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Z'/></svg>
						<span>Неважное дело</span>
					</div>
					<div class="item_btn ready">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' style='fill:none;stroke-miterlimit:10;stroke-width:32px'/><polyline points='368 192 256.13 320 208.18 272' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='191.95' y1='320' x2='144' y2='272' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='305.71' y1='192' x2='254.16' y2='251' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
						<span>Не готово</span>
					</div>
					<div class="item_btn add-item">
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-a</title><line x1='256' y1='112' x2='256' y2='400' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='400' y1='256' x2='112' y2='256' style='stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
						<span>Добавить подзадачу</span>
					</div>
				</div>
				<div class="under-items">
					<div class="item grey">
						<h3>Новая подзадача</h3>
						<a href="#" class="item_btn del">
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
							<span>Удалить</span>
						</a>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Affairs',
		props: {
			titleAffairs: {
				type: String
			}
		},
		data: () => ({
			loading: true
		}),
		mounted() {
			this.loading = false
		}
	}
</script>