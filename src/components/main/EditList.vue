<template>
	<div class="modal-window" v-if="!editListData.hidden">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<div class="modal-window__form">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'EditList',
		props: {
			editListData: {
				type: Object,
				default: {}
			}
		}
	}
</script>