// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    corePlugins: {
        container: false,
    },
    theme: {
        extend: {
            colors: {
                primary: '#FA5430',
            },
        },
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            addComponents({
                '.container': {
                    maxWidth: theme('columns.7xl'),
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: theme('spacing.4'),
                    paddingRight: theme('spacing.4'),
                },
                '.flex-center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            });
        }),
        require('@tailwindcss/line-clamp'),
    ],
};
