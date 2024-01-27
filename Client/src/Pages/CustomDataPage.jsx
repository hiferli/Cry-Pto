import { useEffect, useState } from 'react'
import LineGraph from '../Components/Charts/LineGraph'
import './CSS/CustomDataPage.CSS'
import axios from 'axios'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import React from 'react'

const CustomDataPage = () => {
    const minDistance = 5;
    const [xData, setXData] = useState([0]);
    const [yData, setYData] = useState([0]);
    const [metrics, setMetrics] = useState({
        min: 10,
        max: 100,
        freq: 1
    });

    const getData = async () => {
        await axios.get(
            'http://localhost:3000/api/data',
            {
                params: {
                    min: (metrics.min || 1),
                    max: (metrics.max || 100),
                    prev: ((xData.length) ? xData[xData.length - 1] : 0)
                }
            }
        ).then((response) => {
            const values = response.data.coordinates;
            setXData([...xData, values.x])
            setYData([...yData, values.y])

            if(yData.length > 100){
                setXData(xData.slice(1));
                setYData(yData.slice(1));
            }
        })
            .catch(error => console.log(error))
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getData();
        }, ((metrics.freq * 1000) || 1000));

        return () => clearInterval(interval);
    }, [xData])

    function valuetext(value) {
        return `${value}`;
    }

    const handleChange = (event, newValue, activeThumb) => {
        if (event.target.name == 'range') {
            // handleRangeChange(event)
            if (!Array.isArray(newValue)) {
                return;
            }

            if (newValue[1] - newValue[0] < minDistance) {
                if (activeThumb === 0) {
                    const clamped = Math.min(newValue[0], 100 - minDistance);
                    const min = clamped;
                    const max = clamped + minDistance;
                    setMetrics({ ...metrics, min: min, max: max });
                } else {
                    const clamped = Math.max(newValue[1], minDistance);
                    const max = clamped;
                    const min = clamped - minDistance;
                    setMetrics({ ...metrics, min: min, max: max });
                }
            } else {
                setMetrics({ ...metrics, min: newValue[0], max: newValue[1] });
            }
        } else if (event.target.name === 'freq') {
            // handleFrequencyChange(event);
            setMetrics({ ...metrics, [event.target.name]: newValue });
        }
    }

    return (
        <div className='container'>
            <h1 className='header'>Custom Graph</h1>

            <div className='info'>
                <Box className='metrics' sx={{ width: 300 }}>
                    <h2>Range: {metrics.max} - {metrics.min}</h2>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={[metrics.min, metrics.max]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        name='range'
                        id='range'
                        />
                </Box>

                <Box className='metrics' sx={{width: 300}}>
                    <h2>Frequency: {metrics.freq}</h2>
                    <Slider
                        name='freq'
                        id='freq'
                        aria-label="Small steps"
                        defaultValue={metrics.freq}
                        value={metrics.freq}
                        onChange={handleChange}
                        getAriaValueText={valuetext}
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                        />
                </Box>

            </div>

            <LineGraph xData={xData} yData={yData} />
        </div>
    )
}

export default CustomDataPage