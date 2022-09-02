export const COLORS = [
    '#77204e',
    '#FF5733',
    '#C70039',
    '#0096FF'
]

export const LIGHT_COLORS = [
    '#f7eef2',
    '#fff1ee',
    '#faeaef',
    '#eaf6ff'
]

export const getRandomColor = () => {
    return COLORS[Math.floor(Math.random() * 4)];
}