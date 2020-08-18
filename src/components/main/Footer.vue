<template>
	<footer class="footer">
		<div class="container-fluid p-0">
			<div class="row">
				<div class="col-md-4 col-sm-5 d-none d-sm-block">
					<FooterList @addList="addList"  />
				</div>
				<div class="col-md-8 col-sm-7">
					<FooterTodo :todo="todo" @addTodo="addTodo" />
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import FooterList from '@/components/footer/FooterList'
	import FooterTodo from '@/components/footer/FooterTodo'

	export default {
		name: 'Footer',
		props: {
			todo: {
				type: Object,
				default: {}
			}
		},
		methods: {
			addList(list) {
				this.$emit('addList', list)
			},
			addTodo(todo) {
				this.$emit('addTodo', todo)
			}
		},
		components: {
			FooterList, FooterTodo
		}
	}
</script>