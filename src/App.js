import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'

import './App.css'

import Chart from './components/Chart'
import SavedPlots from './components/SavedPlots'
import Loading from './components/Loading'

function App() {
	const [isLoading, setIsLoading] = useState(true)
	const [dataSets, setDataSets] = useState({})
	const [savedPlots, setSavedPlots] = useState([])
	const [view, setView] = useState('Analytics')

	// Run once after first render. Preparing data here
	// If data is very big, in case ui is blocked, we can load multiple times here until it's fully loaded.
	useEffect(() => {
		Papa.parse('http://localhost:3000/data/test.csv', {
			download: true,
			delimiter: ',',
			complete: result => {
				result.data.splice(-1, 1)
				setDataSets(dataSets => ({ ...dataSets, test: [...result.data] }))
				setIsLoading(false)
			}
		})
	}, [])

	// Here we can simply hide view when switch so that it won't be unmount hence speed up swtich
	// But if you don't need frequent switch, it's not necessary to occupy extra memory for hidden view
	let content
	if (view === 'Analytics') {
		content = (
			<Chart
				title='Analytics'
				dataSets={dataSets}
				data-test='cpn-chart'
				switchView={setView}
				setSavedPlots={setSavedPlots}
			/>
		)
	} else if (view === 'Saved Plots') {
		content = (
			<SavedPlots
				switchView={setView}
				savedPlots={savedPlots}
				setSavedPlots={setSavedPlots}
			/>
		)
	}

	return (
		<div data-test='app'>
			{isLoading ? <Loading data-test='cpn-loading' /> : content}
		</div>
	)
}

export default App
