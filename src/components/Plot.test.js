import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Plot from './Plot'

Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
	const newProps = { plotData: [], x: '', y: '', ...props }
	return shallow(<Plot {...newProps} />)
}

describe('Plot', () => {
	it('renders without crashing', () => {
		const wrapper = setup()
		const component = wrapper.find("[data-test='plot']")
		expect(component.length).toBe(1)
	})
})
