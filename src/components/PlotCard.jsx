import React from 'react'
import {
	VictoryChart,
	VictoryScatter,
	VictoryAxis,
	VictoryTheme,
	VictoryContainer,
	VictoryLegend
} from 'victory'

function PlotCard(props) {
	console.log('Rerender')
	const handleDrag = e => {
		e.dataTransfer.setData('from', props.id)
		console.log(props.id)
	}
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

	const handleDragOver = e => {
		e.preventDefault()
	}

	return (
		<div
			draggable='true'
			onDragStart={handleDrag}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className='card__content'
			onClick={() =>
				props.handleClick({
					plotData: props.plotData,
					x: props.x,
					y: props.y
				})
			}>
			<VictoryChart
				theme={VictoryTheme.material}
				// style={{ parent: { maxWidth: '70%' } }}
				width={900}
				height={500}
				containerComponent={
					<VictoryContainer
						style={{
							margin: 'auto',
							width: '85%',
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

export default React.memo(PlotCard, (prev, next) => {
	console.log(prev.id === next.id)
	return prev.id === next.id
})
