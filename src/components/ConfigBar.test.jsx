import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConfigBar from './ConfigBar'

Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
	const newProps = {
		setAxisX: () => {},
		setAxisY: () => {},
		setDataSet: () => {},
		dataSetOptions: [],
		columnXOptions: [],
		columnYOptions: [],
		...props
	}
	return shallow(<ConfigBar {...newProps} />)
}

describe('ConfigBar', () => {
	it('renders without crashing', () => {
		const wrapper = setup()
		const component = wrapper.find("[data-test='configbar']")
		expect(component.length).toBe(1)
	})

	it('renders configuration bar', () => {
		const wrapper = setup()
		const component = wrapper.find("[data-test='cpn-configdroplist']")
		expect(component.length).toBe(3)
	})
})
