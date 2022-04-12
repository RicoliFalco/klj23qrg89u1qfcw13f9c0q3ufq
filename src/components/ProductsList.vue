<script>
import Product from './Product.vue'

export default {
	components: {
		Product
	},
	props: {
		products: {
			type: Array,
			default: []
		},
	},
	emits: [
		'deleteProduct'
	],
	data(){
		return {
			viewMode: 'grid',
		}
	},
}
</script>

<template>
	<section>
		<div class="fluid-rcontainer">
			<div class="section-title">
				<h2 class="text-shadow-black ">
					<font-awesome-icon :icon="['fas', 'clipboard-check']"/>&nbsp;Browse products
				</h2>

				<div class="actions">
					<button type="button" class="action" @click="viewMode = 'list'" :class="{active: viewMode == 'list'}">
						<font-awesome-icon :icon="['fas', 'list']"/>
					</button>
					<button type="button" class="action" @click="viewMode = 'grid'" :class="{active: viewMode == 'grid'}">
						<font-awesome-icon :icon="['fas', 'grip']"/>
					</button>
				</div>
			</div>

			<div class="products-wrap" :class="{ 'grid-view': viewMode == 'grid', 'list-view': viewMode == 'list' }">
				<Product v-for="(item,index) in products" :key="item.id" @deleteProduct="$emit('deleteProduct', item.id)"
					:viewMode="viewMode"
					:isOdd="index % 2 === 0"
					:title="item.title"
					:description="item.description"
					:category="item.category"
					:employee="item.employee"
					:price="item.price"
					:reviews="item.reviews"
				/>
			</div>
		</div>
	</section>
</template>

<style lang="less" scoped>
@import '../less/utils.less';

section{
	border-top: 2px solid @white;
}

.section-title{
	display: grid;
	grid-template-columns: 1fr auto;
	justify-content: space-between;
}

.actions{
	.le-xs({
		display: none;
	});
}

.actions{
	border-radius: 10px;
	font-size: 0;
	height: 40px;
}

.action{
	display: inline-block;
	background-color: @purple;
	border: none;
	height: 100%;
	padding: 0 20px;
	cursor: pointer;
	font-size: 20px;
	@radius: 20px;

	&:first-child{
		border-radius: @radius 0 0 @radius;
	}
	&:last-child{
		border-radius: 0 @radius @radius 0;
	}

	&.active,
	&:hover{
		background-color: lighten(@purple, 20%);
	}

	svg{
		.svg-shadow-black(0.05em);
	}
}

.grid-view-mode{
	display: grid;
	column-gap: 20px;
	row-gap: 20px;
}

.products-wrap{
	margin-bottom: var(--padding-desktop);
	grid-template-columns: repeat(5, 1fr);

	.le-lg({
		grid-template-columns: repeat(4, 1fr);
	});
	.le-md({
		grid-template-columns: repeat(3, 1fr);
	});
	.le-sm({
		grid-template-columns: repeat(2, 1fr);
	});
	.le-xs({
		grid-template-columns: 1fr;
	});

	.ge-sm({
		&.grid-view{
			.grid-view-mode();
		}
	});

	.le-xs({
		.grid-view-mode();
	});
}
</style>