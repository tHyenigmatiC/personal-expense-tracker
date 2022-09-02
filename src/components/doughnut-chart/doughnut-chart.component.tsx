import { Doughnut } from 'react-chartjs-2'

interface IObjectKeys {
    [key: string]: string
}

const getChartData = ({ ...data }) => {
    const labels = Object.keys(data)
    const dataset = Object.values(data)
    return {
        labels: labels,
        datasets: [
            {
                label: 'Expense Tracker',
                data: dataset,
                backgroundColor: ['#77204e', '#FF5733', '#C70039'],
                boderWidth: 2,
            },
        ],
    }
}

export const DoughnutChart = ({ ...data }: IObjectKeys) => {
    return <Doughnut data={getChartData({ data })} />
}
