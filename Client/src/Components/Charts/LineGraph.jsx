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
                        color: '#F2944B'
                    },
                ]}
                width={1000}
                height={300}
            />
        </div>
    )
}

export default LineGraph