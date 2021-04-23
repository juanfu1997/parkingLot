module.exports = {
	publicPath: './',
	outputDir: process.env.outputDir,
	productionSourceMap: false, // 为false不会生成map文件，不利于调试，但时网页不会看到源码，减少打包体积。
	// css: {
	// 	loaderOptions: {
	// 		postcss: {
	// 			plugins: [
	// 				require('postcss-pxtorem')({
	// 					rootValue: 32, // 换算的基数
	// 					selectorBlackList: ['weui', 'mu', 'lx', 'loading_leaf'], // 忽略转换正则匹配项
	// 					propList: ['*'],
	// 				}),
	// 			],
	// 		},
	// 	},
	// },
	// configureWebpack: {
	// 	externals: {
	// 		vue: 'Vue',
	// 		'vue-router': 'VueRouter',
	// 	},
	// },
	// 跨域配置
	devServer: {
		proxy: {
			'/API2': {
				target: 'http://58.254.141.8:8102',
				changeOrigin: true,
				pathRewrite: {
					'^/API2': '',
				},
			},
		},
	},
};
