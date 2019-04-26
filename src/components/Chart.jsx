import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ConfigBar from './ConfigBar'
import Plot from './Plot'
import '../css/style.css'

/**
 * Function component -- Top level container for configuration and plot
 * @function Chart
 * @param {object} props
 * @returns {object}
 */
function Chart(props) {
	const [dataSet, setDataSet] = useState('')
	const [axisX, setAxisX] = useState('')
	const [axisY, setAxisY] = useState('')

	const [plotData, setPlotData] = useState([])

	const [dataSetOptions, setDataSetOptions] = useState([])
	const [columnXOptions, setColumnXOptions] = useState([])
	const [columnYOptions, setColumnYOptions] = useState([])

	// On dataSets change, update dataSetOptions and set current dataSet default to the first one.
	useEffect(() => {
		const keys = Object.keys(props.dataSets)
		setDataSetOptions(keys)
		setDataSet(keys[0])
	}, [props.dataSets])

	// if user select different dataset, update header and rawData
	useEffect(() => {
		// if dataSet is empty, that means it's loaded for the first time. It won't excute following code until dataSet is set.
		if (props.dataSets !== [] && dataSet !== '') {
			const header = props.dataSets[dataSet][0]
			const rawData = props.dataSets[dataSet].slice(1)
			const sample = rawData[0]
			const options = []

			// Keep only rows with data of numbers
			for (let i = 0; i < header.length; i++) {
				if (!isNaN(sample[i])) {
					options.push(header[i])
				}
			}
			setColumnXOptions(options)
			setColumnYOptions(options)
			setAxisX(options[0])
			setAxisY(options[0])
		}
	}, [dataSet, props.dataSets])

	// if axisX or axisY changed, update canvas by update plotData
	useEffect(() => {
		// if axisX or axisY is empty, either it's loaded for first time or dataSet updated. Plot won't update when axisX or axisY is empty
		if (axisX !== '' || axisY !== '') {
			const header = props.dataSets[dataSet][0]
			const rawData = props.dataSets[dataSet].slice(1)
			const x_index = header.findIndex(title => title === axisX)
			const y_index = header.findIndex(title => title === axisY)

			// TODO: Need furthur detailed information for polishing
			const plotDataUpdate = rawData.map(item => ({
				x: item[x_index] === '' ? 0 : parseFloat(item[x_index]),
				y: item[y_index] === '' ? 0 : parseFloat(item[y_index])
			}))

			setPlotData(plotDataUpdate)
		}
	}, [axisX, axisY, props.dataSets, dataSet])

	return (
		<div className='chart' data-test='chart'>
			<div className='bar u-relative'>
				<div className='bar__content'>
					<h2 className='heading-secondary u-vertical-center'>{props.title}</h2>
				</div>
			</div>
			<ConfigBar
				data-test='cpn-configbar'
				setAxisX={setAxisX}
				setAxisY={setAxisY}
				setDataSet={setDataSet}
				dataSetOptions={dataSetOptions}
				columnXOptions={columnXOptions}
				columnYOptions={columnYOptions}
			/>
			<Plot plotData={plotData} x={axisX} y={axisY} data-test='cpn-plot' />
		</div>
	)
}

// PropTypes Check
Chart.propTypes = {
	title: PropTypes.string.isRequired,
	dataSets: PropTypes.object.isRequired
}

export default Chart
