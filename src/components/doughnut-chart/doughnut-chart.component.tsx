import { Doughnut } from 'react-chartjs-2'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

interface IObjectKeys {
    [key: string]: string
}

const getChartData = ({ ...data }: IObjectKeys) => {
    const labels = Object.keys(data)
    const dataset = Object.values(data)
    return {
        datasetIdKey: 'expense',
        labels: labels,
        datasets: [
            {
                label: 'Expense Tracker',
                data: dataset,
                backgroundColor: ['#ff2400', '#50c878'],
                boderWidth: 6,
            },
        ],
    }
}

export const DoughnutChart = ({ ...data }: IObjectKeys) => {
    return (
        <div className='flex flex-col items-center w-56'>
            <p className='text-lg font-medium text-tealdark'>Montly Report</p>
            <Doughnut data={getChartData({ ...data })} />
        </div>
    )
}
