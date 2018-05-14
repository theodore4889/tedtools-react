import React, { Component } from 'react';
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

export default class NumberInput extends Component {
  render(){
    return (
      <NumberInputWrapper>
        <input
          type="number"
          value={this.props.numVal}/>
      </NumberInputWrapper>
    );
  }
}
