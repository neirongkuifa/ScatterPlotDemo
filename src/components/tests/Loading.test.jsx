import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Loading from '../Loading'

Enzyme.configure({ adapter: new Adapter() })

describe('Loading', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<Loading />)
		const component = wrapper.find("[data-test='loading']")
		expect(component.length).toBe(1)
	})
})
