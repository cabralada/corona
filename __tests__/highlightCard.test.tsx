import 'jsdom-global/register';
import { mount } from 'enzyme';
import React from 'react';
import HighlightCard from '../components/HighlightCases/HighlightCard';

test('hello world', () => {
	const wrapper = mount(<HighlightCard value={3} name="Test" />);
	// expect(wrapper.text()).toMatchSnapshot();
});