import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NumpadContainer = styled.div`
  padding: 3px;
`;

const NumpadRow = styled.div`

`;

const NumpadButton = styled.button`
  width: 65px;
  height: 65px;
  padding: 8px;
  border-radius: 20%;
  font-size: 35px;
  margin: 3px;
`;

export class NumpadWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numVal: this.props.numVal,
    };

    this.updateVal = this.updateVal.bind(this);
    this.addDigit = this.addDigit.bind(this);
    this.subDigit = this.subDigit.bind(this);
  }

  componentDidUpdate() {
    // console.log('NumpadContainer componentDidUpdate ');
    // console.log("prop", this.props.numVal, " state", this.state.numVal);
    if (this.props.numVal !== this.state.numVal) {
      this.state = {
        numVal: this.props.numVal,
      };
    }
  }

  updateVal(val) {
    this.setState({
      numVal: val,
    }, this.props.updateVal(val));
  }

  addDigit(val) {
    const newVal = this.state.numVal + val;
    this.updateVal(newVal);
  }

  subDigit() {
    const newVal = this.props.numVal.slice(0, -1);
    this.updateVal(newVal);
  }

  render() {
        // console.log('NumpadContainer.js', 'render()', 'NumVal', this.state.numVal);
    return (
      <NumpadContainer>
        <NumpadRow>
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(1)}>1</NumpadButton>
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
          <NumpadButton className="btn btn-default" onClick={() => this.addDigit(0)}>0</NumpadButton>
          <NumpadButton className="btn btn-success" onClick={() => this.props.submitVal()}>
            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
          </NumpadButton>
        </NumpadRow>
      </NumpadContainer>
    );
  }
}

NumpadWrapper.propTypes = {
  numVal: PropTypes.string,
  updateVal: PropTypes.func,
  submitVal: PropTypes.func,
};

export default NumpadWrapper;
