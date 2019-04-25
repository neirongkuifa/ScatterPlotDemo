import React from 'react'
import PropTypes from 'prop-types'

import ConfigDropList from './ConfigDropList'
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
		<div className='bar u-relative'>
			<div className='u-vertical-center'>
				<ConfigDropList
					title='Dataset'
					options={props.dataSetOptions}
					handleSelect={handleSetDataSet}
				/>
				<ConfigDropList
					title='ColumnX'
					options={props.columnXOptions}
					handleSelect={props.setAxisX}
				/>
				<ConfigDropList
					title='ColumnY'
					options={props.columnYOptions}
					handleSelect={props.setAxisY}
				/>
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
