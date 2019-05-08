import React from 'react'
import {
	VictoryChart,
	VictoryScatter,
	VictoryAxis,
	VictoryTheme,
	VictoryContainer,
	VictoryLegend
} from 'victory'
import PropTypes from 'prop-types'

/**
 * Function component that represents a draggable plot card
 * @function PlotCard
 * @param {*} props
 * @returns {object}
 */
function PlotCard(props) {
	/**
	 * function to handle ondragstart event. set data from for drop receiver element
	 * @function handleDrag
	 * @param {*} e
	 */
	const handleDrag = e => {
		e.dataTransfer.setData('from', props.id)
	}

	/**
	 * function to handle ondrop event. on drop, we rearrange savedPlots and rerender
	 * @function handleDrop
	 * @param {*} e
	 */
	const handleDrop = e => {
		e.preventDefault()
		const to = props.id
		const from = e.dataTransfer.getData('from')
		if (to !== from) {
			props.setSavedPlots(prev => {
				const fromIndex = prev.findIndex(i => i.id === from)
				const toIndex = prev.findIndex(i => i.id === to)

				// Reconstruct SavedPlots when drop
				if (fromIndex < toIndex) {
					return [].concat(
						prev.slice(0, fromIndex),
						prev.slice(fromIndex + 1, toIndex + 1),
						prev[fromIndex],
						prev.slice(toIndex + 1)
					)
				} else {
					return [].concat(
						prev.slice(0, toIndex),
						prev[fromIndex],
						prev.slice(toIndex, fromIndex),
						prev.slice(fromIndex + 1)
					)
				}
			})
		}
	}

	/**
	 * function to enable drop element
	 * @function handleDragOver
	 * @param {*} e
	 */
	const handleDragOver = e => {
		// Enable Drop Element
		e.preventDefault()
	}

	return (
		<div
			data-test='cpn-plotcard'
			draggable='true'
			onDragStart={handleDrag}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className='card__content'
			onClick={() =>
				props.handleClick({
					plotData: props.plotData,
					x: props.x,
					y: props.y,
					maxX: props.maxX,
					maxY: props.maxY,
					dataSet: props.dataSet
				})
			}>
			<VictoryChart
				theme={VictoryTheme.material}
				width={900}
				height={500}
				containerComponent={
					<VictoryContainer
						style={{
							margin: 'auto',
							width: props.size || '85%',
							padding: '1.5rem 0 0 0'
						}}
					/>
				}>
				<VictoryLegend
					x={300}
					y={30}
					orientation='horizontal'
					gutter={20}
					colorScale={['#b64438']}
					data={[{ name: `${props.x} v.s. ${props.y}` }]}
				/>
				<VictoryAxis
					label={props.x}
					style={{ axisLabel: { padding: 30, fontSize: 12 } }}
				/>
				<VictoryAxis
					dependentAxis
					label={props.y}
					style={{
						axisLabel: { padding: 30, fontSize: 12 }
					}}
				/>
				<VictoryScatter
					data={props.plotData}
					style={{ data: { fill: '#c43a31' } }}
					size={2}
				/>
			</VictoryChart>
		</div>
	)
}

// PropTypes Check
PlotCard.propTypes = {
	size: PropTypes.string,
	id: PropTypes.string,
	x: PropTypes.string,
	y: PropTypes.string,
	maxX: PropTypes.string,
	maxY: PropTypes.string,
	dataSet: PropTypes.string,
	plotData: PropTypes.array,
	setSavedPlots: PropTypes.func,
	handleClick: PropTypes.func
}

export default React.memo(PlotCard, (prev, next) => {
	return prev.id === next.id
})
