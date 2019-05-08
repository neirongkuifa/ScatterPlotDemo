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
		}, 30)

		window.addEventListener('resize', handleResize)

		// On component will unmount, remove listener
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const handleClose = e => {
		e.stopPropagation()
		setInspect(null)
	}

	// Calculate Grid
	const savedPlotsSize = props.savedPlots.length
	const cols = Math.floor((width * 0.95 - 30) / 350)
	const rows = Math.ceil(savedPlotsSize / cols)
	const gutterHorizontal = Math.floor(((width * 0.95 - 30) % 350) / (cols + 1))

	// Construct Grid
	const marginGrid = []
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			// If we still have left plots, do the following, otherwise break
			if (row * cols + col + 1 <= savedPlotsSize) {
				// Calculate margin for each card
				const marginLeft = col === 0 ? gutterHorizontal : 0
				const marginRight = gutterHorizontal
				// Add one col to this row
				marginGrid.push({ left: marginLeft, right: marginRight })
			} else {
				break
			}
		}
	}

	const grid = props.savedPlots.map((i, index) => (
		<div
			className='card'
			key={i.id}
			style={{
				marginLeft: marginGrid[index].left,
				marginRight: marginGrid[index].right
			}}>
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
	))

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
							<div className='card-expand__close' onClick={handleClose}>
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
					<div className={inspect === null ? null : 'u-hide'}>{grid}</div>
				</div>
			</div>
		</div>
	)
}

export default SavedPlots
