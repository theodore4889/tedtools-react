/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import H1 from 'components/H1';
import SoundButton from './SoundButton';
import AnswerButton from './AnswerButton';
import NumberInput from './NumberInput';
import NumpadContainer from './NumpadContainer';
import DigitButtons from './DigitButtons';
import LanguageDropdown from './LanguageDropdown';
import ResponsiveVoice from './ResponsiveVoice';
import messages from './messages';

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
`;

export default class NumbersQuiz extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    console.log('[START] NumbersQuiz Constructor');
    super(props);
    this.state = {
      numVal: 0,
      guessVal: '',
      language: 'Chinese Female',
      numDigits: 3,
      inputBgColor: '#00000000'
    }

    this.updateNumVal = this.updateNumVal.bind(this);
    this.updateGuessVal = this.updateGuessVal.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.updateNumDigits = this.updateNumDigits.bind(this);

    this.submitValue = this.submitValue.bind(this);
    this.updateInputBgColor = this.updateInputBgColor.bind(this);

    this.speakNumber = this.speakNumber.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    console.log('[END] NumbersQuiz Constructor');
  }

  componentDidMount(){
    console.log('NumbersQuiz Component Did Mount');
    this.updateNumVal();

    const script = document.createElement("script");
    script.src = "https://code.responsivevoice.org/responsivevoice.js";
    script.async = true;
    script.onload = this.speakNumber;
    document.body.appendChild(script);
  }

  updateNumVal(callback){
    let newNum = Math.floor(Math.random() * Math.pow(10, this.state.numDigits));
    console.log('updateNumVal, newNum:', newNum);
    this.setState({
      numVal: newNum,
      guessVal: ''
    }, callback);
  }

  updateGuessVal(val){
    this.setState({
      guessVal: val
    })
  }

  updateLanguage(val){
    this.setState({
      language: val
    }, this.speakNumber);
  }

  updateNumDigits(val){
    console.log('updateNumDigits, val:', val);
    this.setState({
      numDigits: val
    }, () => {
      this.updateNumVal(this.speakNumber);
    });
  }

  submitValue(){
    if(this.state.guessVal == this.state.numVal){
      console.log("Correct");
      this.updateInputBgColor('#07db00'); //green

      setTimeout( function() {
        this.updateNumVal(this.speakNumber);
        this.updateInputBgColor('#00000000');
      }.bind(this), 2000);

    } else {
      console.log("Incorrect");
      this.updateInputBgColor('#ff0033'); //red
      setTimeout( function() {
        this.speakNumber();
        this.updateInputBgColor('#00000000');
      }.bind(this), 2000);
    }
  }

  updateInputBgColor(color, callback){
    this.setState({
      inputBgColor: color,
    }, callback);
  }

  speakNumber(){
    console.log('speakNumber, numVal:', String(this.state.numVal), ', language:', this.state.language);
    responsiveVoice.speak(String(this.state.numVal), this.state.language);
  }

  showAnswer(){
    this.updateInputBgColor('#ff0033'); //red
    this.updateGuessVal(this.state.numVal);
    setTimeout( function() {
      this.updateInputBgColor('#00000000');
      this.updateNumVal(this.speakNumber);
    }.bind(this), 2000);
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>Numbers Quiz</title>
          <meta name="description" content="Feature page of React.js Boilerplate application" />
        </Helmet>

        <H1><FormattedMessage {...messages.header} /></H1>
        <p><FormattedMessage {...messages.subtitle} /></p>

        <audio id="num-audio" type="audio/mpeg"></audio>

	      <SoundButton id="sound-button" className="btn btn-primary" data-toggle="tooltip" data-placement="left" title="Play Sound" onClick={this.speakNumber}>
		      <span className="glyphicon glyphicon-volume-up" aria-hidden="true"></span>
	      </SoundButton>
        &nbsp;&nbsp;
        <AnswerButton id="answer-button" className="btn btn-danger" data-toggle="tooltip" data-placement="right" title="Show Answer" onClick={this.showAnswer}>
          <b>?</b>
        </AnswerButton>
        <br/><br/>

        <NumberInput numVal={this.state.guessVal} backgroundColor={this.state.inputBgColor}/>
        <NumpadContainer numVal={this.state.guessVal} updateVal={this.updateGuessVal} submitVal={this.submitValue}/>
        <br/>

        <div id="settings">
          <DigitButtons updateVal={this.updateNumDigits}/>
          <br/>
          <LanguageDropdown selected={this.state.language} updateVal={this.updateLanguage}/>
        </div>
        <br/><br/>

        <div id="attributions">
          <ResponsiveVoice />
        </div>

      </Wrapper>
    );
  }
}
