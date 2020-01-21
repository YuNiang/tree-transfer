/* globals describe, it, afterEach */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import assert from 'power-assert';
import Adapter from 'enzyme-adapter-react-15';
import Example from '../src';

Enzyme.configure({ adapter: new Adapter() });

describe('Example test', () => {
    describe('render', () => {
        it('should render', () => {
            // TODO:
        });
    });
});
