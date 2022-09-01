/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bgdark: '#abf2ab',
                bgmedium: '#c7f6c7',
                bglight: '#e3fae3',
                shadedark: '#243b24',
                shademedium: '#487748',
                shadelight: '#6cb26c',
            },
        },
    },
    plugins: [],
}
