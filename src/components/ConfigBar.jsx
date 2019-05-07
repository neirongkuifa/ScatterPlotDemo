import React from 'react'
import PropTypes from 'prop-types'

import ConfigDropList from './ConfigDropList'
import ConfigInput from './ConfigInput'
import '../css/style.css'

/**
 * Function component -- Container for all configurations
 * @function ConfigBar
 * @param {object} props
 * @returns {object}
 */
function ConfigBar(props) {
	/**
	 * When you switch dataset, the options for column x and y actually changed, so empty them when switch dataset
	 * @function setDataSet
	 * @param {string} value
	 */
	const handleSetDataSet = value => {
		props.setAxisX('')
		props.setAxisY('')
		props.setDataSet(value)
	}
	return (
		<div className='bar u-relative' data-test='configbar'>
			<div className='bar__content'>
				<div className='u-vertical-center'>
					<ConfigDropList
						title='Dataset'
						data-test='cpn-configdroplist'
						options={props.dataSetOptions}
						handleSelect={handleSetDataSet}
					/>
					<ConfigDropList
						title='ColumnX'
						data-test='cpn-configdroplist'
						options={props.columnXOptions}
						handleSelect={props.setAxisX}
					/>
					<ConfigDropList
						title='ColumnY'
						data-test='cpn-configdroplist'
						options={props.columnYOptions}
						handleSelect={props.setAxisY}
					/>
					<ConfigInput title='Max X' handleInput={props.setMaxX} />
					<ConfigInput title='Max Y' handleInput={props.setMaxY} />
					<div className='config'>
						<button className='config__btn' onClick={props.savePlot}>
							save
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

// PropTypes Check
ConfigBar.propTypes = {
	setAxisX: PropTypes.func.isRequired,
	setAxisY: PropTypes.func.isRequired,
	setDataSet: PropTypes.func.isRequired,
	dataSetOptions: PropTypes.array.isRequired,
	columnXOptions: PropTypes.array.isRequired,
	columnYOptions: PropTypes.array.isRequired
}

export default ConfigBar
