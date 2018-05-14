import React, { Component } from 'react';
import styled from 'styled-components';

const NumpadContainer = styled.div`
  padding: 3px;
`;

const NumberInput = styled.input.attrs({
  type: 'number',
})`
  height: 80px;
  width: 260px;
  font-size: 60px;
  border-radius: 30px;
  text-align: center;
  border: 1px solid;
  margin: 0px;
  transition: all .25s ease-in-out;
    -webkit-transition: all .25s ease-in-out;
    -moz-transition: all .25s ease-in-out;
    -o-transition: all .25s ease-in-out;
`;

const NumpadRow = styled.div`
  padding: 3px;
`;

const NumpadButton = styled.button`
  width: 65px;
  height: 65px;
  padding: 8px;
  border-radius: 20%;
  font-size: 35px;
`;

export default class NumpadWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      numVal: this.props.numVal
    };

    this.addDigit = this.addDigit.bind(this);
    this.subDigit = this.subDigit.bind(this);
    //this.submitValue = this.submitValue.bind(this);
    //this.clearGuess = this.clearGuess.bind(this);
  }

  addDigit(val){
    this.state.numVal+= val;
    this.props.updateVal(this.state.numVal);
  }

  subDigit(){
    this.state.numVal = this.state.numVal.slice(0, -1);
    this.props.updateVal(this.state.numVal);
  }

  render(){
        //console.log('NumpadContainer.js', 'render()', 'NumVal', this.state.numVal);
    return(
      <NumpadContainer>
        <NumpadRow>
          <NumpadButton value="1" className="btn btn-default" onClick={() => this.addDigit(1)}>1</NumpadButton>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(2)}>2</NumpadButton>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(3)}>3</NumpadButton>
        </NumpadRow>
        <NumpadRow>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(4)}>4</NumpadButton>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(5)}>5</NumpadButton>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(6)}>6</NumpadButton>
        </NumpadRow>
        <NumpadRow>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(7)}>7</NumpadButton>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(8)}>8</NumpadButton>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(9)}>9</NumpadButton>
        </NumpadRow>
        <NumpadRow>
    			<NumpadButton className="btn btn-danger" onClick={() => this.subDigit()}>
    				<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
    			</NumpadButton>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit('0')}>0</NumpadButton>
          <NumpadButton className="btn btn-success" onClick={() => this.props.submitVal()}>
    				<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
    			</NumpadButton>
        </NumpadRow>
      </NumpadContainer>
    );
  }
}
