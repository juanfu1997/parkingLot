<template>
	<div>
		<van-nav-bar title="标题">
			<template #left>
				<van-icon name="arrow-left" size="22" />
			</template>
			<template #right>
				<slot name="right"></slot>
			</template>
		</van-nav-bar>
	</div>
</template>
<script>
import { NavBar, Icon } from 'vant';
export default {
	name: 'topHeader',
	props: {},
	components: {
		[NavBar.name]: NavBar,
		[Icon.name]: Icon,
	},
};
</script>
<style lang="stylus" scoped>
.header
    width 100vw
    display flex
    justify-content space-between
    align-items center
    background red
</style>
