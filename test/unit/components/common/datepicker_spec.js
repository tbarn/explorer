/** @jsx React.DOM */
var assert = require('chai').assert;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Datepicker = require('../../../../client/js/app/components/common/datepicker.js');
var TestHelpers = require('../../../support/TestHelpers');

describe('components/common/datepicker', function() {
  before(function() {
    this.onSetStub = sinon.stub();
    this.component = TestUtils.renderIntoDocument(<Datepicker name="Picker" onSet={this.onSetStub} />);
  });

  beforeEach(function() {
    this.onSetStub.reset();
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Datepicker));
    });
    it('has one input', function(){
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
    });
  });

  describe('interactions', function() {
    it('should call the onSet prop function with the correct day', function() {
      var inputNode = this.component.refs.datepicker.getDOMNode();
      TestUtils.Simulate.focus(inputNode);
      var dayNodes = $(this.component.getDOMNode()).find('td[role="presentation"] div');
      var fifteenthDayNode;
      _.each(dayNodes, function(dayNode) {
        if (dayNode.textContent === '15') {
          fifteenthDayNode = dayNode;
        }
      });
      $(fifteenthDayNode).click();
      assert.strictEqual(this.onSetStub.getCall(0).args[1].getDate(), 15);
    });
  });

});