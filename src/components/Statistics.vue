<script>
import Chart from 'chart.js/auto'
import Collapsable from './Collapsable.vue'

export default {
	components: {
		Collapsable,
	},
	data(){
		return {
			diagram: null,
			palette: [
				'#e70000',
				'#ff7b00',
				'#ffe600',
				// More colors to be added in case of more categories
			],
		}
	},
	props: {
		products: {
			type: Array,
			default: [],
		},
	},
	computed: {
		// We use the fetched products to be more efficient instead of load the same data from a second endpoint
		stats(){
			let result = {}

			for (let prod of this.products){
				const category = prod.category.toLowerCase()

				if (typeof result[category] === 'undefined'){
					result[category] = 0
				}

				result[category]++
			}

			return result
		},
		statsLabels(){
			return Object.keys(this.stats)
		},
		statsValues(){
			return Object.values(this.stats)
		},
		statsColors(){
			return this.palette.map(color => `${color}88`)
		}
	},
	watch: {
		products(){
			this.createDiagram()
		}
	},
	methods: {
		createDiagram(){
			if (!this.diagram){
				this.diagram = new Chart(
					document.getElementById('diagram-canvas'),
					{
						type: 'polarArea',
						data: {
							labels: this.statsLabels,
							datasets: [{
								label: 'Products per category',
								data: this.statsValues,
								backgroundColor: this.statsColors
							}]
						},
						options: {}
					}
				)
			}
		},
	},
}
</script>

<template>
	<section>
		<div class="fluid-rcontainer">
			<Collapsable :isCollapsed="false">
				<template #header>
					<h2 class="section-title">
						<font-awesome-icon :icon="['fas', 'chart-pie']"/>&nbsp;Some numbers...
					</h2>
				</template>
				<template #body>
					<div class="stats-wrap">
						<div class="diagram-column">
							<canvas id="diagram-canvas" v-show="products.length"></canvas>
						</div>
						<div class="text-column">
							Total products: {{ products.length }}
						</div>
					</div>
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

.stats-wrap{
	display: grid;
	grid-template-columns: 50% 50%;
	column-gap: 20px;
	align-items: center;
	padding-bottom: var(--padding-desktop);

	.le-md({
		column-gap: 10px;
		padding-bottom: var(--padding-tablet);
	});
	.le-sm({
		padding-bottom: var(--padding-mobile);
	});
	.le-xs({
		grid-template-columns: 100%;
	});
}

.diagram-column{
	width: 100%;
	max-width: 300px;
	margin-left: auto;

	.le-xs({
		margin-right: auto;
	});
}

.text-column{
	font-size: 25px;

	.le-xs({
		text-align: center;
	});
}
</style>