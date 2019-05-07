import React, { useState, Suspense } from 'react'

const PlotCard = React.lazy(() => import('./PlotCard'))

function SavedPlots(props) {
	const [inspect, setInspect] = useState(null)
	return (
		<div className='chart u-relative'>
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
			<div className='plot-large'>
				<div className='plot-large__content'>
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
					<div className={inspect === null ? null : 'u-hide'}>
						{props.savedPlots.map(i => (
							<div className='card' key={i.id}>
								<Suspense fallback={<div>Loading PlotCard...</div>}>
									<PlotCard
										id={i.id}
										x={i.axisX}
										y={i.axisY}
										plotData={i.plotData}
										handleClick={setInspect}
									/>
								</Suspense>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SavedPlots
