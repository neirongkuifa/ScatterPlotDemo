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
	const handleDrag = e => {
		e.dataTransfer.setData('from', props.id)
		console.log(props.id)
	}
	const handleDrop = e => {
		e.preventDefault()
		console.log('To: ' + props.id)
		console.log('From: ' + e.dataTransfer.getData('from'))
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

export default PlotCard
