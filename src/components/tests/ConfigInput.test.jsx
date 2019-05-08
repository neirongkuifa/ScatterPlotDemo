import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConfigInput from '../ConfigInput'

Enzyme.configure({ adapter: new Adapter() })

describe('ConfigInput', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<ConfigInput />)
		const component = wrapper.find("[data-test='cpn-configinput']")
		expect(component.length).toBe(1)
	})
})
