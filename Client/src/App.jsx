import { useState } from 'react'
import './App.css'
import LineGraph from './Components/Charts/LineGraph'

function App() {
	const [xData, setXData] = useState([1]);
	const [yData, setYData] = useState([2]);
	
	return (
		<>
			<h1>this is a line chart</h1>
			<LineGraph xData={xData} yData={yData} />
			<button onClick={addValue}>Add</button>
		</>
	)
}

export default App
