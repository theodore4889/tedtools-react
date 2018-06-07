import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';

export default class ComponentName extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    console.log('[START] $[ComponentName] Constructor');
    super(props);
    this.state = {

    }

    //this.speakNumber = this.speakNumber.bind(this);
    console.log('[END] $[ComponentName] Constructor');
  }

  componentDidMount(){
    // console.log('$[ComponentName] Component Did Mount');
    //
    // const script = document.createElement("script");
    // script.src = "$[script.src]";
    // script.async = true;
    // script.onload = "$[script.onload]";
    // document.body.appendChild(script);
  }

  helperFunction(arg){
    console.log('updateNumDigits, val:', val);
    this.setState({
      numDigits: val
    })

  }


  render() {
    return (
      <div>

      </div>
    );
  }
}
