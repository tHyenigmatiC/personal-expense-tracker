/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            animation: {
                'slide-right': 'slide-right .5s ease-in-out',
                disappear: 'disappear .5s ease-out forwards',
                appear: 'appear .5s ease-in backwards',
            },
            backgroundImage: {
                // eslint-disable-next-line quotes
                '404Image': "url('https://i.imgur.com/yW2W9SC.png')",
            },
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
                bannercolor: '#9F6C66',
            },
            height: {
                '40vh': '40vh',
                '42vh': '42vh',
                '60vh': '60vh',
            },
            width: {
                '20vw': '20vw',
                '30vw': '30vw',
                '40vw': '40vw',
                '50vw': '50vw',
            },
            gridAutoColumns: {
                'horizontal-overflow': 'minmax(160px,1fr)',
            },
            gridTemplateColumns: {
                'horizontal-overflow': 'repeat(auto-fill,minmax(160px,1fr))',
            },
            keyframes: {
                'slide-right': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                disappear: {
                    '0%%': { transform: 'rotateX(90deg)', opacity: 1 },
                    '50%': { transform: 'rotateX(0deg)', opacity: 0.8 },
                    '80%': { transform: 'rotateX(0deg)', opacity: 0.5 },
                    '100%': { display: 'none', transform: 'rotateX(90deg)', opacity: 0 },
                },
                appear: {
                    '0%%': { display: 'none', transform: 'rotateX(90deg)', opacity: 0 },
                    '50%': { transform: 'rotateX(0deg)', opacity: 0.5 },
                    '80%': { transform: 'rotateX(0deg)', opacity: 0.8 },
                    '100%': { transform: 'rotateX(90deg)', opacity: 1 },
                },
            },
        },
    },
    plugins: [],
}
