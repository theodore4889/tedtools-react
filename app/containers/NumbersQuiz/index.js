/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import SoundButton from './SoundButton';
import AnswerButton from './AnswerButton';
import NumberInput from './NumberInput';
import NumpadContainer from './NumpadContainer';
import DigitButtons from './DigitButtons';
import LanguageDropdown from './LanguageDropdown';
import ResponsiveVoice from './ResponsiveVoice';
import messages from './messages';

export default class NumbersQuiz extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    console.log('[START] NumbersQuiz Constructor');
    super(props);
    this.state = {
      numVal: '0',
      guessVal: '',
      language: 'Chinese Female',
      numDigits: 3
    }

    this.updateNumVal = this.updateNumVal.bind(this);
    this.updateGuessVal = this.updateGuessVal.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.updateNumDigits = this.updateNumDigits.bind(this);

    this.submitValue = this.submitValue.bind(this);
    this.clearGuess = this.clearGuess.bind(this);

    this.speakNumber = this.speakNumber.bind(this);
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
    let newNum = String(Math.floor(Math.random() * 10 * this.state.numDigits));
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
    });
  }

  updateNumDigits(val){
    console.log('updateNumDigits, val:', val);
    this.setState({
      numDigits: val
    })
    this.updateNumVal();
  }

  submitValue(){
    if(this.state.guessVal == this.state.numVal){
      console.log("Correct");
      //this.clearGuess();
      this.updateNumVal(this.speakNumber);
    } else {
      console.log("Incorrect");
    }
  }

  clearGuess(callback){
    this.setState({
      guessVal: ''
    }, callback);
  }

  speakNumber(){
    console.log('speakNumber, numVal:', this.state.numVal, ', language:', this.state.language);
    responsiveVoice.speak(this.state.numVal, this.state.language);
  }

  render() {
    return (
      <div>
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
        <AnswerButton id="answer-button" className="btn btn-danger" data-toggle="tooltip" data-placement="right" title="Show Answer">
          <b>?</b>
        </AnswerButton>
        <br/><br/>

        <NumberInput numVal={this.state.guessVal}/>
        <NumpadContainer numVal={this.state.guessVal} updateVal={this.updateGuessVal} submitVal={this.submitValue}/>
        <br/>

        <div id="settings">
          <DigitButtons updateVal={this.updateNumDigits}/>
          <br/>
          <LanguageDropdown selected={this.state.language} updateVal={this.updateLanguage}/>
        </div>

        <div id="attributions">
          <ResponsiveVoice />
        </div>

      </div>
    );
  }
}
