<script>
export default {
	props: {
		store: {
			type: Object,
		}
	}
}
</script>

<template>
	<section class="section-title">
		<h1>{{ store.name }}</h1>
		<h2>({{ store.category }})</h2>
	</section>
</template>

<style lang="less" scoped>
@import "../less/utils.less";

section{
	background-color: @black;
	text-align: center;
}
h1{
	text-transform: uppercase;
}
h2{
	margin-top: 5px;
}
</style>