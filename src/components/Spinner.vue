<script>
export default {
	props: {
		isVisible: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<template>
	<div class="spinner-layer" :class="{visible: isVisible}">
		<font-awesome-icon class="spinner" :icon="['fas', 'circle-notch']"/>
	</div>
</template>


<style lang="less" scoped>
@import '../less/utils.less';

.spinner-layer{
	display: grid;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	background-color: fadeOut(@black, 50%);

	// transition
	visibility: hidden;
	opacity: 0;
	transition: visibility 0s ease 0.5s, opacity 0.5s ease 0s;

	&.visible {
		visibility: visible;
		opacity: 1;
		transition: visibility 0s ease 0s, opacity 0.5s ease 0s;
	}
}
.spinner{
	font-size: 40px;
	color: @white;
	display: inline-block;
	animation: rotate 2s infinite linear;

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}	
		100% {
			transform: rotate(+359deg);
		}
	}
}
</style>