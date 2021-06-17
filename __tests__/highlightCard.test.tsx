import 'jsdom-global/register';
import { mount, shallow } from 'enzyme';
import React from 'react';
import HighlightCard from '../components/HighlightCases/HighlightCard';
import { kFormatter } from '../utility/utility';

describe('HighlightCard', () => {
	test('Detect CORRECT props', () => {
		const wrapper = mount(<HighlightCard value={3} name="Test" />);
		expect(wrapper.prop('value')).toBe(3);
		expect(wrapper.prop('name')).toBe('Test');
	});

	test('Detect props VALUE type is NUMBER', () => {
		const wrapper = mount(<HighlightCard value={3} name="" />);
		expect(typeof wrapper.prop('value')).toBe('number')
	});

	test('Detect props NAME type is STRING', () => {
		const wrapper = mount(<HighlightCard value={0} name="Test" />);
		expect(typeof wrapper.prop('name')).toBe('string')
	});

	test('Detect Number format', () => {
		expect(kFormatter(10000)).toBe('10k')
		expect(kFormatter(1000000)).toBe('1m')
	});
})
