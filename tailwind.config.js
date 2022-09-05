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
                teallight: '#f2f8f8',
                tealdark: '#006666',
                cardbg: '#fefefe',
                'btn-primary': '#50c878',
            },
            gridAutoColumns: {
                'horizontal-overflow': 'minmax(160px,1fr)',
            },
            gridTemplateColumns: {
                'horizontal-overflow': 'repeat(auto-fill,minmax(160px,1fr))',
            },
        },
    },
    plugins: [],
}
