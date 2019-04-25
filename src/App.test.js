import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from './App'

Enzyme.configure({ adapter: new Adapter() })

const setup = (props = {}) => {
	return shallow(<App />)
}

describe('App', () => {
	it('renders without crashing', () => {
		const wrapper = setup()
		const appComponent = wrapper.find("[data-test='app']")
		expect(appComponent.length).toBe(1)
	})

	it('renders Loading when dataSets is not ready', () => {
		const wrapper = setup()
		const appComponent = wrapper.find("[data-test='cpn-loading']")
		expect(appComponent.length).toBe(1)
	})

	it('renders Chart component when dataSets is ready', () => {})
})
