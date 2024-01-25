import { useEffect, useState } from 'react'
import './App.css'
import LineGraph from './Components/Charts/LineGraph'
import axios from 'axios'

function App() {
	const [xData, setXData] = useState([0]);
	const [yData, setYData] = useState([0]);
	const [metrics, setMetrics] = useState({});

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
			setXData([...xData , values.x])
			setYData([...yData , values.y])
		})
		.catch(error => console.log(error))
	};

	const updateMetrics = (event) => {
		event.preventDefault();
		setMetrics({...metrics , [event.target.name]: event.target.value})
	}

	useEffect(() => {
		const interval = setInterval(() => {
			getData();
		}, ((metrics.freq * 1000) || 1000));

		return () => clearInterval(interval);
	}, [xData])
	

	return (
		<>
			<h1>Graph</h1>
			
			<div>
				<label htmlFor="min">Min Value:</label>
				<input onChange={updateMetrics} type="number" name='min' id='min' min={1}  />
					<br />
				<label htmlFor="max">Max Value:</label>
				<input onChange={updateMetrics} type="number" name='max' id='max' min={1}  />
					<br />
				<label htmlFor="freq">Frequency:</label>
				<input onChange={updateMetrics} type="number" name='freq' id='freq' min={1} />
			</div>

			<LineGraph xData={xData} yData={yData} />
		</>
	)
}

export default App
