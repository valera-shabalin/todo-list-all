<template>
	<footer class="footer">
		<div class="container-fluid p-0">
			<div class="row">
				<div class="col-md-4 col-sm-5 d-none d-sm-block">
					<div class="footer__list">
						<form class="list-form">
							<input type="text" class="default-input" placeholder="Название нового списка">
							<button class="btn_add">
								<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'><title>ionicons-v5-a</title><line x1='256' y1='112' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='400' y1='256' x2='112' y2='256' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
							</button>
						</form>
					</div>
				</div>
				<div class="col-md-8 col-sm-7">
					<div class="footer__affairs">
						<form class="affairs-form">
							<input type="text" class="default-input" placeholder="Название нового дела">
							<textarea class="default-input" rows="1" placeholder="Описание нового дела"></textarea>
							<button class="btn_add">
								<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'><title>ionicons-v5-a</title><line x1='256' y1='112' x2='256' y2='400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='400' y1='256' x2='112' y2='256' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
							</button>
							<div class="warn">
								<label for="new-affair-warn">Срочное дело</label>
								<input type="checkbox" id="new-affair-warn">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		name: 'Footer'
	}
</script>