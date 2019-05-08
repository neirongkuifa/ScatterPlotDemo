import React, { useState } from 'react'

/**
 * Function component to set column limit
 * @function ConfigInput
 * @param {*} props
 * @returns {object}
 */
function ConfigInput(props) {
	// Input Control State
	const [value, setValue] = useState('')

	/**
	 * function to handle input. on input change, update control state and set configuration state
	 * @function handleInput
	 * @param {*} input
	 */
	const handleInput = input => {
		setValue(input.toString())

		// If maxX or maxY is empty, set it to positive infinity, otherwise set it to input value
		if (input.toString() === '') {
			props.handleInput(Number.POSITIVE_INFINITY)
		} else {
			props.handleInput(input)
		}
	}

	return (
		<div className='config'>
			<span className='config__title'>{props.title}: </span>
			<input
				className='config__input'
				type='number'
				value={value}
				onChange={e => handleInput(e.target.value)}
			/>
		</div>
	)
}

export default ConfigInput
