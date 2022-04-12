<script>
import apiConnector from './utils/api-connector.js'
import Header from './components/Header.vue'
import Statistics from './components/Statistics.vue'
import AddProductForm from './components/AddProductForm.vue'
import ProductsList from './components/ProductsList.vue'
import Spinner from './components/Spinner.vue'

export default {
	components: {
		Header,
		Statistics,
		AddProductForm,
		ProductsList,
		Spinner,
	},

	data() {
		return {
			isLoading: false,
			store: {
				name: '',
				employees: []
			},
			products: [],
			categories: [
				'Torta',
				'Biscotti',
				'Pasticcini'
			],
		}
	},

	methods: {

		async loadStore(){
			this.isLoading = true
			
			const result = await apiConnector.loadStore()
			if (result) this.store = result
			
			this.isLoading = false
		},

		async loadProducts(){
			this.isLoading = true
			
			this.products = await apiConnector.loadProducts()
			
			this.isLoading = false
		},

		async createProduct(product){
			this.isLoading = true

			const result = await apiConnector.createProduct(product)
			if (result) this.loadProducts()
			
			this.isLoading = false
		},

		async deleteProduct(prodId){
			if (confirm('Do you really want to delete this product?')){
				this.isLoading = true
				
				const result = await apiConnector.deleteProduct(prodId)
				if (result) this.loadProducts()
				
				this.isLoading = false
			}
		}
	},

	async mounted() {
		this.loadStore()
		this.loadProducts()
	},
}
</script>

<template>
	<Header :store="store"></Header>
	<Statistics :products="products"/>
	<AddProductForm @createProduct="createProduct" :categories="categories" :employees="store.employees"/>
	<ProductsList :products="products" @deleteProduct="deleteProduct"/>
	<Spinner :isVisible="isLoading"/>
</template>

<style lang="less">
@import "./less/utils.less";

:root{
	--padding-desktop: 40px;
	--padding-tablet: 30px;
	--padding-mobile: 20px;
}

body{
	margin: 0;
	font-family: 'Roboto';
	background-color: @blue;
	color: @white;
}

h1, h2, h3{
	margin: 0;
}

button{
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	text-transform: uppercase;
	font-weight: bold;
	color: @white;
	.text-shadow-black();

	svg{
		.svg-shadow-black();
	}

	&,
	&.ok{
		background-color: darken(@green, 10%);

		&:hover{
			background-color: @green;
		}
	}
	&.warn{
		background-color: darken(@orange, 10%);

		&:hover{
			background-color: @orange;
		}
	}
	&.danger{
		background-color: darken(@red, 10%);

		&:hover{
			background-color: @red;
		}
	}

	&.active{
		box-shadow: 1px 1px 5px @black inset;
	}
}//button

.section-title{
	padding: var(--padding-desktop) 0;

	.le-md({
		padding: var(--padding-tablet) 0;
	});
	.le-sm({
		padding: var(--padding-mobile) 0;
	});
}
</style>
