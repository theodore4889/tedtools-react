import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DigitButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    this.props.updateVal(val);
  }

  render() {
    return (
      <div>
        <p><b>Number of Digits</b></p>
        <div id="digit-buttons" role="group" className="btn-group">
          <button id="dig-1" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(1)}>1</button>
          <button id="dig-2" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(2)}>2</button>
          <button id="dig-3" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(3)}>3</button>
          <button id="dig-4" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(4)}>4</button>
          <button id="dig-5" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(5)}>5</button>
          <button id="dig-6" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(6)}>6</button>
          <button id="dig-7" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(7)}>7</button>
          <button id="dig-8" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(8)}>8</button>
          <button id="dig-9" className="digit btn btn-primary btn-sm" onClick={() => this.handleChange(9)}>9</button>
        </div>
      </div>
    );
  }
}

DigitButtons.propTypes = {
  updateVal: PropTypes.func,
};

export default DigitButtons;
