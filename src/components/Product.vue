<script>
import Collapsable from './Collapsable.vue'

export default {
	props: {
		viewMode: {
			type: String,
			required: true,
		},
		isOdd: {
			type: Boolean,
			default: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		employee: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		reviews: {
			type: Array,
			required: true,
		},
	},
	emits: [
		'deleteProduct'
	],
	components: {
		Collapsable,
	},
}
</script>

<template>
	<div class="product" :class="{row: viewMode == 'list', card: viewMode == 'grid', odd: isOdd}">
		<h3 class="product-title">{{ title }}</h3>
		<div class="product-description">{{ description }}</div>
		<ul class="product-details">
			<li class="product-detail">
				<span class="label">Category</span>
				<span class="value">{{ category }}</span>
			</li>
			<li class="product-detail">
				<span class="label">Price</span>
				<span class="value">{{ price }}€</span>
			</li>
			<li class="product-detail">
				<span class="label">Employee</span>
				<span class="value">{{ employee }}</span>
			</li>
		</ul>
		<div v-show="reviews && reviews.length" class="product-reviews">
			<Collapsable :isCollapsable="viewMode == 'list'" :isCollapsed="viewMode == 'list'">
				<template #header>Reviews ({{reviews.length}})</template>
				<template #body>
					<ul>
						<li class="product-review" v-for="review in reviews">{{ review }}</li>
					</ul>
				</template>
			</Collapsable>
		</div>
		<div class="product-actions">
			<button type="button" class="danger" @click="$emit('deleteProduct')">
				<font-awesome-icon :icon="['fas', 'trash-can']"/>&nbsp;Delete product
			</button>
		</div>
	</div>
</template>

<style lang="less" scoped>
@import '../less/utils.less';

.card-view{
	border-radius: 10px;
	background-color: @black;
	padding-bottom: 60px;
	position: relative;
	overflow: hidden;

	// hover transition
	border: 2px solid @black;

	&:hover{
		border-color: @yellow;
		background-color: lighten(@black, 5%);

		.product-title{
			background-color: darken(@blue, 15%);
		}
	}

	.product-title{
		margin: 0;
		padding: 20px;
		background-color: darken(@blue, 20%);
	}

	.product-description{
		padding: 20px;
	}

	.product-details{
		padding: 0 20px 20px;

		.product-detail{
			display: grid;
			grid-template-columns: 50% 50%;
			align-items: stretch;

			&:not(:first-child){
				border-top: none;
			}

			.label{
				display: inline-block;
				padding: 10px;
			}
			.value{
				display: inline-block;
				padding: 10px;
				background-color: lighten(@black, 10%);
			}
		}
	}

	.product-reviews{
		padding: 0 20px 20px;
	}

	.product-actions{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0 20px 20px;
		box-sizing: border-box;
		text-align: center;
	}
}

.row-view{
	display: grid;
	grid-template-columns: repeat(3, 33.33%);
	grid-template-rows: auto;
	grid-template-areas: 
		"title       title       actions"
		"description description actions"
		"details     details     details"
		"reviews     reviews     reviews"
	;
	padding: 20px;
	background-color: @black;
	border: 2px solid @black;

	&:hover{
		background-color: lighten(@black, 10%);
		border-color: @yellow;
	}

	&.odd{
		background-color: lighten(@black, 5%);
		border-color: lighten(@black, 5%);

		&:hover{
			background-color: lighten(@black, 15%);
			border-color: @yellow;
		}
	}

	.product-title{
		grid-area: title;
	}
	.product-description{
		grid-area: description;
		margin-top: 5px;
	}
	.product-details{
		grid-area: details;
		margin-top: 10px;
		display: grid;
		grid-template-columns: repeat(3, 33.33%);

		.product-detail{
			padding: 10px;

			.label{
				&::after{
					content: ': ';
					display: inline;
				}
			}
		}
	}
	.product-reviews{
		grid-area: reviews;
		margin-top: 10px;
	}
	.product-actions{
		grid-area: actions;
		align-self: center;
		justify-self: flex-end;
	}
}

.product{
	box-sizing: border-box;

	.product-title{
		text-transform: uppercase;
	}

	.product-details{
		display: block;
		margin: 0;
		padding: 0;
		
		.product-detail{
			display: block;
			border: 1px solid @white;

			.value{
				text-transform: uppercase;
			}
		}
	}
	.product-reviews{
		ul{
			margin: 10px 0 0;
			padding: 10px;
			border: 1px solid @white;
		}

		.product-review{
			font-style: italic;
			list-style: none;
			border-top: 1px solid fadeOut(@white, 80%);
			margin-top: 5px;
			padding-top: 5px;

			&:first-child{
				border-top: none;
				margin-top: 0;
				padding-top: 0;
			}

			&::before,
			&::after{
				display: inline;
				content: '"';
			}
		}
	}

	.ge-sm({
		&.row{
			.row-view();
		}
		&.card{
			.card-view();
		}
	});

	.le-xs({
		.card-view();
	});
}
</style>