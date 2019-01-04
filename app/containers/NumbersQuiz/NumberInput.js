import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NumberInputWrapper = styled.div`
  & input {
    height: 80px;
    width: 300px;
    font-size: 60px;
    text-align: center;
    border-radius: 30px;
    border: 1px solid;
    margin: 0px;
    transition: all .25s ease-in-out;
      -webkit-transition: all .25s ease-in-out;
      -moz-transition: all .25s ease-in-out;
      -o-transition: all .25s ease-in-out;
  }

  & input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: this.props.backgroundColor,
    };
  }

  render() {
    // Update background color
    if (this.props.backgroundColor !== this.state.backgroundColor) {
      this.state = {
        backgroundColor: this.props.backgroundColor,
      };
    }

    return (
      <NumberInputWrapper>
        <input
          style={{ backgroundColor: this.state.backgroundColor }}
          type="number"
          value={this.props.numVal}
        />
      </NumberInputWrapper>
    );
  }
}

NumberInput.propTypes = {
  backgroundColor: PropTypes.string,
  numVal: PropTypes.string,
};

export default NumberInput;
