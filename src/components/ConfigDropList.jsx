import React, { useState } from 'react'
import PropTypes from 'prop-types'

import '../css/style.css'

/**
 * Function component -- Drop Down List for Configuration
 * @function ConfigDropList
 * @param {object} props
 * @returns {object}
 */
function ConfigDropList(props) {
	// State for controlled component
	const [option, setOption] = useState('')

	/**
	 * First, update option for controlled component. Second, pass value to parent's handleSelect method.
	 * @function handleSelect
	 * @param {object} e
	 */
	const handleSelect = e => {
		setOption(e.target.value)
		props.handleSelect(e.target.value)
	}
	return (
		<div className='config'>
			<span className='config__title'>{props.title}: </span>
			<select
				className='config__options'
				value={option}
				onChange={handleSelect}>
				{props.options.map(item => (
					<option className='config__option' value={item} key={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	)
}

// PropTypes Check
ConfigDropList.propTypes = {
	title: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	handleSelect: PropTypes.func.isRequired
}

export default ConfigDropList
