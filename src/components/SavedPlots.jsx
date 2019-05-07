import React, { useState, useEffect, Suspense } from 'react'
import debounce from 'lodash/debounce'

const PlotCard = React.lazy(() => import('./PlotCard'))

function SavedPlots(props) {
	const [inspect, setInspect] = useState(null)
	const [width, setWidth] = useState(window.innerWidth)

	// On component did mount, add windown resize listener
	useEffect(() => {
		// Use debounce to control function invokation times
		const handleResize = debounce(() => {
			setWidth(window.innerWidth)
		}, 100)

		window.addEventListener('resize', handleResize)

		// On component will unmount, remove listener
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	// Calculate Grid
	const savedPlotsSize = props.savedPlots.length
	const cols = Math.floor((width * 0.95 - 30) / 350)
	const rows = Math.ceil(savedPlotsSize / cols)
	const gutterHorizontal = Math.floor(((width * 0.95 - 30) % 350) / (cols + 1))

	// Construct Grid
	const gridRows = []
	for (let row = 0; row < rows; row++) {
		const gridCols = []
		for (let col = 0; col < cols; col++) {
			// If we still have left plots, do the following, otherwise break
			if (row * cols + col + 1 <= savedPlotsSize) {
				// If the card is not the last of the row, set margin right to gutterHorizontal
				const marginLeft = col === 0 ? gutterHorizontal : 0
				const marginRight = gutterHorizontal

				// Locate item in savedPlots
				const i = props.savedPlots[row * cols + col]

				// Add one col to this row
				gridCols.push(
					<div
						className='card'
						key={i.id}
						style={{ marginLeft: marginLeft, marginRight: marginRight }}>
						<Suspense fallback={<div>Loading PlotCard...</div>}>
							<PlotCard
								id={i.id}
								x={i.axisX}
								y={i.axisY}
								plotData={i.plotData}
								setSavedPlots={props.setSavedPlots}
								handleClick={setInspect}
							/>
						</Suspense>
					</div>
				)
			} else {
				break
			}
		}

		// Add one row to grid rows
		gridRows.push(
			<div className='row' key={`${cols} ${row}`}>
				{gridCols}
			</div>
		)
	}

	return (
		<div className='chart u-relative'>
			{/* Title Bar */}
			<div className='bar u-relative'>
				<div className='bar__content'>
					<h2 className='heading-secondary u-center'>Saved Plots</h2>
					<button
						href='#'
						className='link link-left'
						onClick={() => props.switchView('Analytics')}>
						&larr; Plot
					</button>
				</div>
			</div>

			{/* Saved Plots */}
			<div className='plot-large'>
				<div className='plot-large__content'>
					{/* If it's in inspect mode, show the expanded card in inspect, and hide all other plots */}
					{inspect === null ? null : (
						<div className='card-expand'>
							<div
								className='card-expand__close'
								onClick={() => setInspect(null)}>
								&times;
							</div>
							<PlotCard
								x={inspect.x}
								y={inspect.y}
								plotData={inspect.plotData}
								handleClick={() => {}}
							/>
						</div>
					)}

					{/* If it's not in inspect mode, show all plots */}
					<div className={inspect === null ? null : 'u-hide'}>
						{gridRows}
						{/* {props.savedPlots.map(i => (
							<div className='card' key={i.id}>
								<Suspense fallback={<div>Loading PlotCard...</div>}>
									<PlotCard
										id={i.id}
										x={i.axisX}
										y={i.axisY}
										plotData={i.plotData}
										setSavedPlots={props.setSavedPlots}
										handleClick={setInspect}
									/>
								</Suspense>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SavedPlots
