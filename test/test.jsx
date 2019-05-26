// JSDom is used to allow the tests to run right from the command line (no browsers needed)
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

global.window = dom.window;
global.document = dom.window.document;

// Also apply a requestAnimationFrame polyfill
require('raf').polyfill();


import React from 'react';
import { after, before, beforeEach, describe, it } from "mocha";
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme'; // https://github.com/airbnb/enzyme/issues/465 shallow vs mount vs render
import chai from 'chai'; // https://github.com/producthunt/chai-enzyme#setup
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme()); // Note the invocation at the end

import TestUtils from 'react-dom/test-utils';
import ReactFlScrollbar from '../scrollbar';



// describe makes a test group
describe('<ReactFlScrollbar/> states', function () {
    // This will be run before each test to reset the scroll position
    beforeEach(() => {
        window.pageYOffset = 0;
    });

    this.scrollRef = React.createRef();

    // and each `it` function describes an individual test
    it('is hidden when first rendered', function () {
        let renderedComponent = TestUtils.renderIntoDocument(
            <ReactFlScrollbar contentRef={this.scrollRef} innerScrollableClass={'test'}>
                <div className={'test'}>UP</div>
            </ReactFlScrollbar>
        );

        expect(renderedComponent.state.show).to.be.false;
    });

    it('is shown if the page is scrolled past the `showUnder` point', function () {
        let renderedComponent = TestUtils.renderIntoDocument(
            <ReactFlScrollbar contentRef={this.scrollRef} innerScrollableClass={'test'}>
                <div className={'test'}>UP</div>
            </ReactFlScrollbar>
        );

        // Set the scroll position to 200 and trigger the event manually
        window.pageYOffset = 200;
        renderedComponent.handleScroll();

        expect(renderedComponent.state.show).to.be.true;
    });

});