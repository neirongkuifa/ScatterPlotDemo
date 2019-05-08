import React, { useState, useEffect, Suspense } from 'react'
import PropTypes from 'prop-types'

const PlotCard = React.lazy(() => import('./PlotCard'))

/**
 * Function component -- Display Saved Plots
 * @function SavedPlots
 * @param {*} props
 * @returns {object}
 */
function SavedPlots(props) {
	// Inpect Plot State
	const [inspect, setInspect] = useState(null)

	// Window Width State
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		// For performace enhancement, we can do debounce here. But it will cause flickering issue.
		const handleResize = () => {
			setWidth(window.innerWidth)
		}

		// On component did mount, add windown resize listener
		window.addEventListener('resize', handleResize)

		// On component will unmount, remove listener
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	/**
	 * Function to handle close click event
	 * @function handleClose
	 * @param {object} e -- click event object
	 */
	const handleClose = e => {
		e.stopPropagation()
		setInspect(null)
	}

	// Calculate Grid Column number and gutter size
	const cols = Math.floor((width * 0.95 - 30) / 350)
	const gutterHorizontal = Math.floor(((width * 0.95 - 30) % 350) / (cols + 1))

	// Construct Grid and Apply margins
	const grid = props.savedPlots.map((i, index) => (
		<div
			className='card'
			key={i.id}
			style={{
				// For the first column of each row set margin left and right to gutter size
				// For the rest columns of each row set margin left to 0, right to gutter size
				marginLeft: index % cols === 0 ? gutterHorizontal : 0,
				marginRight: gutterHorizontal
			}}>
			<Suspense fallback={<div>Loading PlotCard...</div>}>
				<PlotCard
					id={i.id}
					x={i.axisX}
					y={i.axisY}
					maxX={i.maxX}
					maxY={i.maxY}
					dataSet={i.dataSet}
					plotData={i.plotData}
					setSavedPlots={props.setSavedPlots}
					handleClick={setInspect}
				/>
			</Suspense>
		</div>
	))

	return (
		<div className={'chart u-relative'} data-test='cpn-savedplots'>
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
					{/* 1. If it's in inspect mode, show the expanded card in inspect, and hide all other plots */}
					{inspect === null ? null : (
						<div className='card-expand'>
							<div className='card-expand__close' onClick={handleClose}>
								&times;
							</div>
							<div className='u-text'>
								dataSet: {inspect.dataSet} columnX: {inspect.x} columnY:{' '}
								{inspect.y} Max X: {inspect.maxX} Max Y:{inspect.maxY}
							</div>
							<PlotCard
								x={inspect.x}
								y={inspect.y}
								plotData={inspect.plotData}
								handleClick={() => {}}
							/>
						</div>
					)}

					{/* 2. If it's not in inspect mode, show all plots */}
					<div className={inspect === null ? null : 'u-hide'}>{grid}</div>
				</div>
			</div>
		</div>
	)
}

// PropTypes Check
SavedPlots.propTypes = {
	switchView: PropTypes.func,
	savedPlots: PropTypes.array,
	setSavedPlots: PropTypes.func
}

export default SavedPlots
