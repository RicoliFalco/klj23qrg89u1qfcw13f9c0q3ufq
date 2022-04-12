<script>
import Collapsable from './Collapsable.vue'

export default {
	components: {
		Collapsable,
	},
	props: {
		categories: {
			type: Array,
			required: true
		},
		employees: {
			type: Array,
			required: true
		}
	},
	emits: ['createProduct'],
	data(){
		return {
			fields : {
				name: '',
				description: '',
				category: '',
				employee: '',
				price: '',
				reviews: ''
			},
			validity: {
				name: true,
				description: true,
				category: true,
				employee: true,
				price: true,
				reviews: true,
			},
		}
	},
	methods: {
		submit(){
			if (confirm('Do you really want to create a new product?')){
				if (this.validate()){
					this.$emit('createProduct', {
						title: this.fields.name,
						category: this.fields.category,
						price: this.fields.price,
						employee: this.fields.employee,
						description: this.fields.description,
						reviews: this.fields.reviews
							.split('\n')
							.map(item => item.trim())
							.filter(item => !!item)
					})
					this.reset()
				}
				else{
					alert('Check the form validity')
				}
			}
		},
		reset(){
			this.fields = {
				name: '',
				description: '',
				category: '',
				employee: '',
				price: '',
				reviews: []
			}
			this.validity = {
				name: true,
				description: true,
				category: true,
				employee: true,
				price: true,
				reviews: true,
			}
		},
		validate(){
			for (let key in this.fields){
				let value = this.fields[key]

				if (key === 'price'){
					value = parseFloat(value)
				}

				const validity = key === 'reviews' ? true : !!value
				this.validity[key] = validity
			}

			return Object.values(this.validity).every(Boolean);
		}
	}
}
</script>

<template>
	<section>
		<div class="fluid-rcontainer">
			<Collapsable :isCollapsed="true">
				<template #header>
					<h2 class="section-title">
						<font-awesome-icon :icon="['fas', 'pen-to-square']"/>&nbsp;Add new product
					</h2>
				</template>
				<template #body>
					<form slot="body" @submit.prevent="submit()">
						<div class="form-fields">
							<div class="form-control">
								<label>
									<span class="label">Name</span>
									<input v-model.trim="fields.name" type="string" placeholder="Apples pie" :class="{error: !validity.name}"/>
								</label>
								<div class="validation-tip" v-show="!validity.name">Required: insert the product's name</div>
							</div>
							<div class="form-control">
								<label>
									<span class="label">Category</span>
									<select v-model="fields.category" :class="{error: !validity.category}">
										<option value="" selected>Select one option</option>
										<option v-for="category in categories" :value="category">{{ category }}</option>
									</select>
								</label>
								<div class="validation-tip" v-show="!validity.category">Required: select the product's category</div>
							</div>
							<div class="form-control">
								<label>
									<span class="label">Employee</span>
									<select v-model="fields.employee" :class="{error: !validity.employee}">
										<option value="" selected>Select one option</option>
										<option v-for="employee in employees" :value="employee">{{ employee }}</option>
									</select>
								</label>
								<div class="validation-tip" v-show="!validity.employee">Required: select the product's employee</div>
							</div>
							<div class="form-control">
								<label>
									<span class="label">Price (€)</span>
									<input v-model.number="fields.price" type="string" placeholder="9.99" :class="{error: !validity.price}"/>
								</label>
								<div class="validation-tip" v-show="!validity.price">Required: insert the product's price</div>
							</div>
							<div class="form-control">
								<label>
									<span class="label">Description</span>
									<textarea v-model.trim="fields.description" type="string" placeholder="Tasty and creamy pie" rows="5" :class="{error: !validity.description}"></textarea>
								</label>
								<div class="validation-tip" v-show="!validity.description">Required: insert the product's description</div>
							</div>
							<div class="form-control">
								<label>
									<!-- Optional -->
									<span class="label">Reviews (one per row)</span>
									<textarea v-model="fields.reviews" type="string" placeholder="A best pie I've ever eaten" rows="5"></textarea>
								</label>
							</div>
						</div>
						<div class="actions">
							<button type="submit" class="ok">
								<font-awesome-icon :icon="['fas', 'plus']"/>&nbsp;Add product
							</button>
							<button type="button" class="warn" @click.prevent="reset">
								<font-awesome-icon :icon="['fas', 'ban']"/>&nbsp;Reset
							</button>
						</div>
					</form>
				</template>
			</Collapsable>
		</div>
	</section>
</template>

<style lang="less" scoped>
@import "../less/utils.less";

section{
	border-top: 2px solid @white;
	background-color: @gray;
	color: @black;
}

form{
	padding-bottom: var(--padding-desktop);

	.le-md({
		padding-bottom: var(--padding-tablet);
	});
	.le-sm({
		padding-bottom: var(--padding-mobile);
	});
}

.form-fields{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 10px;
	row-gap: 10px;

	.le-md({
		grid-template-columns: repeat(2, 1fr);
	});
	.le-xs({
		grid-template-columns: 1fr;
	});
}
.label{
	display: block;
	margin-bottom: 5px;
}
input,
textarea,
select{
	font-family: inherit;
	display: block;
	width: 100%;
	box-sizing: border-box;
	padding: 10px;
	border: 2px solid @green;
	border-radius: 5px;
	background-color: @black;
	color: @white;
	outline: none;

	&.error{
		border-color: @red;
	}
	&.ok{
		border-color: @green;
	}
	&:focus{
		border-color: @yellow;
	}
}
textarea{
	resize: none;
}

.placeholder({
	color: darken(@white, 20%);
});

.validation-tip{
	margin-top: 5px;
	font-size: smaller;
	color: @red;
}
.actions{
	margin-top: 20px;
	text-align: right;

	.le-md({
		margin-top: 15px;
	});
	.le-sm({
		margin-top: 10px;
	});

	button{
		margin-left: 5px;	
	}
}

</style>