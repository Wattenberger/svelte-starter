const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				"primary-lighter": "#c7e4d0",
				"primary-light": "#a1cfa9",
				"primary": '#78a77E',
				"primary-dark": "#5c7f5f",
				"primary-darker": "#3f5740",
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			}
		}
	},

	plugins: []
};

module.exports = config;
