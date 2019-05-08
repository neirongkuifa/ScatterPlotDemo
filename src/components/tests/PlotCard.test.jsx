import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PlotCard from '../PlotCard'

Enzyme.configure({ adapter: new Adapter() })

describe('ConfigInput', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<PlotCard />)
		const component = wrapper.find("[data-test='cpn-plotcard']")
		expect(component.length).toBe(1)
	})
})
