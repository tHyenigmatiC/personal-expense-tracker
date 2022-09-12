import { Doughnut } from 'react-chartjs-2'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

interface IObjectKeys {
    title: string
    data: object
}

const getChartData = ({ title, data }: IObjectKeys) => {
    const labels = Object.keys({ ...data })
    const dataset = Object.values({ ...data })
    return {
        datasetIdKey: title,
        labels: labels,
        datasets: [
            {
                label: 'Expense Tracker',
                data: dataset,
                backgroundColor: [
                    '#ff2400',
                    '#50c878',
                    '#FF6633',
                    '#FFB399',
                    '#FF33FF',
                    '#FFFF99',
                    '#00B3E6',
                    '#809900',
                ],
                borderColor: '#c7f6c7',
                boderWidth: 0,
                hoverOffset: 4,
            },
        ],
    }
}

export const DoughnutChart = ({ title, ...data }: IObjectKeys) => {
    return (
        <div className='flex flex-col items-start h-48 w-72'>
            <p className='text-lg font-medium text-tealdark'>{title}</p>
            <Doughnut
                data={getChartData({ title, ...data })}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        tooltip: {
                            animation: {
                                easing: 'easeInCubic',
                            },
                        },
                        legend: {
                            position: 'right',
                            labels: {
                                font: {
                                    style: 'italic',
                                    weight: 'bold',
                                    size: 12,
                                },
                                color: '#000000',
                            },
                        },
                    },
                }}
            />
        </div>
    )
}
