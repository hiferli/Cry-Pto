import { useState } from 'react'
import './App.css'
import LineGraph from './Components/Charts/LineGraph'
import axios from 'axios'

function App() {
	const [xData, setXData] = useState([0]);
	const [yData, setYData] = useState([0]);

	const getData = async () => {
		await axios.get(
			'http://localhost:3000/api/data',
			{
				params: {
					min: 1,
					max: 100,
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

	const addValue = () => {
		getData()
	}

	return (
		<>
			<h1>this is a line chart</h1>
			<LineGraph xData={xData} yData={yData} />
			<button onClick={addValue}>Add</button>
		</>
	)
}

export default App
