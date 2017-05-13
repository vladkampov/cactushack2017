import React from 'react';
import { shallow } from 'enzyme';
import { AuthorisedRouting, UnAuthorisedRouting } from './Routing';

describe('Routing', () => {
	it('AuthorisedRouting is defined', () => {
	  expect(AuthorisedRouting).toBeDefined;
	});

	it('UnAuthorisedRouting is defined', () => {
	  expect(UnAuthorisedRouting).toBeDefined;
	});
});
