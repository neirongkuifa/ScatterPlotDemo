import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SavedPlots from '../SavedPlots'

Enzyme.configure({ adapter: new Adapter() })

describe('ConfigInput', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(
			<SavedPlots savedPlots={[{ id: 1, maxX: 10, maxY: 20 }]} />
		)
		const component = wrapper.find("[data-test='cpn-savedplots']")
		expect(component.length).toBe(1)
	})
})
