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
                'slide-up': 'slide-up .5s ease-in-out',
            },
            backgroundImage: {
                // eslint-disable-next-line quotes
                '404Image': "url('https://i.imgur.com/yW2W9SC.png')",
            },
            borderWidth: {
                0.1: '0.1px',
                3: '3px',
                5: '5px',
                6: '6px',
                11: '11px',
            },
            objectPosition: {
                top: {
                    1.5: '11px',
                },
                left: {
                    0.5: '2px',
                },
            },
            rotate: {
                40: '40deg',
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
                bgDark: '#15202B',
                cardDark: '#192734',
                hoverDark: '#22303C',
                borderDark: '#4e5963',
                textDark1: '#FFFFFF',
                textDark2: '#8899A6',
                textDark3: '#b8c2ca',
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
                rotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0%)' },
                },
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}
