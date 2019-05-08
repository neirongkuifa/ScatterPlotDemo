import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Chart from '../Chart'

Enzyme.configure({ adapter: new Adapter() })

const setup = (props = {}) => {
	return shallow(<Chart {...props} />)
}

describe('Chart', () => {
	it('renders without crashing', () => {
		const wrapper = setup({
			title: 'test',
			dataSets: {},
			switchView: () => {},
			setSavedPlots: () => {}
		})
		const component = wrapper.find("[data-test='chart']")
		expect(component.length).toBe(1)
	})

	it('renders configuration bar', () => {
		const wrapper = setup({
			title: 'test',
			dataSets: {},
			switchView: () => {},
			setSavedPlots: () => {}
		})
		const component = wrapper.find("[data-test='cpn-plot']")
		expect(component.length).toBe(1)
	})

	it('renders plot', () => {
		const wrapper = setup({
			title: 'test',
			dataSets: {},
			switchView: () => {},
			setSavedPlots: () => {}
		})
		const component = wrapper.find("[data-test='cpn-plot']")
		expect(component.length).toBe(1)
	})
})
