import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConfigDropList from '../ConfigDropList'

Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
	const newProps = {
		title: 'test',
		options: [],
		handleSelect: () => {},
		...props
	}
	return shallow(<ConfigDropList {...newProps} />)
}

describe('ConfigBar', () => {
	it('renders without crashing', () => {
		const wrapper = setup()
		const component = wrapper.find("[data-test='configdroplist']")
		expect(component.length).toBe(1)
	})

	it('renders a drop down list', () => {
		const wrapper = setup()
		const component = wrapper.find("[data-test='list']")
		expect(component.length).toBe(1)
	})

	it('renders options according to props', () => {
		const wrapper = setup({ options: ['1', '2'] })
		const component = wrapper.find("[data-test='option']")
		expect(component.length).toBe(2)
	})
})
