import { Doughnut } from 'react-chartjs-2'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

interface IObjectKeys {
    title: string
    data: object
}

interface IChartData extends IObjectKeys {
    isDarkMode: boolean
}

const getChartData = ({ title, isDarkMode, data }: IChartData) => {
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
                    isDarkMode ? '#FB923C' : '#ff2400',
                    '#50c878',
                    '#006666',
                    '#FFB399',
                    '#FF33FF',
                    '#FFFF99',
                    '#00B3E6',
                    '#809900',
                ],
                borderColor: isDarkMode ? '#22303C' : '#F97316',
                boderWidth: 0.5,
                hoverOffset: 4,
            },
        ],
    }
}

export const DoughnutChart = ({ title, ...data }: IObjectKeys) => {
    const isDarkMode = !!localStorage.theme
    return (
        <div className='flex flex-col items-start h-48 w-72'>
            <p className='text-lg font-medium text-orange-900 dark:text-textDark1 dark:font-normal dark:text-base'>
                {title}
            </p>
            <Doughnut
                data={getChartData({ title, isDarkMode, ...data })}
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
                                color: isDarkMode ? '#b8c2ca' : '#000000',
                            },
                        },
                    },
                }}
            />
        </div>
    )
}
