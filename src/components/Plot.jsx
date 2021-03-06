import React from 'react'
import PropTypes from 'prop-types'
import {
	VictoryChart,
	VictoryScatter,
	VictoryAxis,
	VictoryTheme,
	VictoryContainer,
	VictoryLegend
} from 'victory'

import '../css/style.css'

/**
 * Function component to plot data on chart
 * @function Plot
 * @param {*} props
 * @returns {object}
 */
function Plot(props) {
	return (
		<div className='plot' data-test='plot'>
			<div className='plot__content'>
				<VictoryChart
					theme={VictoryTheme.material}
					width={900}
					height={500}
					containerComponent={
						<VictoryContainer
							style={{ margin: 'auto', width: '80%', padding: '10px' }}
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
						style={{ axisLabel: { padding: 30, fontSize: 12 } }}
					/>
					<VictoryScatter
						data={props.plotData}
						style={{ data: { fill: '#c43a31' } }}
						size={2}
					/>
				</VictoryChart>
			</div>
		</div>
	)
}

// PropTypes Check
Plot.propTypes = {
	plotData: PropTypes.array.isRequired,
	x: PropTypes.string.isRequired,
	y: PropTypes.string.isRequired
}

export default Plot
