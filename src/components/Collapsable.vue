<script>
export default {
	props: {
		isCollapsable: {
			type: Boolean,
			default: true,
		},
		isCollapsed: {
			type: Boolean,
			default: false
		},
	}
}
</script>

<template>
	<div class="collapsable" :class="{collapsed: isCollapsable && isCollapsed, enabled: isCollapsable}">
		<div class="collapsable-header" @click="isCollapsable ? isCollapsed = !isCollapsed : true">
			<slot name="header"></slot>
			<font-awesome-icon class="arrow" :icon="['fas', 'chevron-down']" v-show="isCollapsable"/>
		</div>
		<div class="collapsable-body" v-show="!isCollapsable || !isCollapsed">
			<slot name="body"></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
@import '../less/utils.less';

.collapsable{
	&.enabled{
		.collapsable-header{
			cursor: pointer;
			position: relative;

			.arrow{
				font-size: 20px;
				position: absolute;
				top: 50%;
				right: 20px;
				transform: translateY(-50%) rotateZ(0deg);
			}
		}
	}

	&.collapsed {
		.collapsable-header{
			.arrow{
				transform: translateY(-50%) rotateZ(-90deg);
			}
		}
	}
}
</style>