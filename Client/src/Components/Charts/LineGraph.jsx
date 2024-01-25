import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

const LineGraph = ({xData , yData}) => {
    return (
        <div>
            <LineChart
                xAxis={[{ data: xData }]}
                series={[
                    {
                        data: yData   ,
                    },
                ]}
                width={500}
                height={300}
            />
        </div>
    )
}

export default LineGraph