import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import HighlightCases from '../components/HighlightCases/HighlightCases';
import HighlightCard from '../components/HighlightCases/HighlightCard';

describe('HighlightCases', () => {
	test('Detect Length', () => {
		const wrapper = mount(<HighlightCases cases={0} deaths={0} recovered={0}/>);
		expect(wrapper.find(HighlightCard)).toHaveLength(3)
	});

	test('Detect CASES value', () => {
		const wrapper = mount(<HighlightCases cases={0} deaths={0} recovered={0}/>);
		expect(typeof wrapper.prop('cases')).toBe('number')
		expect(wrapper.prop('cases')).toEqual(0)
	});

	test('Detect DEATHS value', () => {
		const wrapper = mount(<HighlightCases cases={0} deaths={0} recovered={0}/>);
		expect(typeof wrapper.prop('deaths')).toBe('number')
		expect(wrapper.prop('deaths')).toEqual(0)
	});

	test('Detect RECOVERED value', () => {
		const wrapper = mount(<HighlightCases cases={0} deaths={0} recovered={0}/>);
		expect(typeof wrapper.prop('recovered')).toBe('number')
		expect(wrapper.prop('recovered')).toEqual(0)
	});
})