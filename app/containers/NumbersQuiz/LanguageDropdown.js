import React, { Component } from 'react';

export default class LanguageDropdown extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.selected
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.state.selected = e.target.value;
    this.props.updateVal(this.state.selected);
  }

  render(){
    return (
      <div>
        <b>Language </b>
        <select id="lang-select" className="selectpicker btn btn-primary btn-sm" value={this.state.selected} onChange={this.handleChange} >
          <option value="Arabic Male">Arabic</option>
          <option value="Chinese (Hong Kong) Female">Chinese (Cantonese)</option>
          <option value="Chinese Female">Chinese (Mandarin)</option>
          <option value="Czech Female">Czech</option>
          <option value="Danish Female">Danish</option>
          <option value="US English Female">English</option>
          <option value="French Female">French</option>
          <option value="Deutsch Female">German</option>
          <option value="Italian Female">Italian</option>
          <option value="Japanese Female">Japanese</option>
          <option value="Korean Female">Korean</option>
          <option value="Portuguese Female">Portuguese</option>
          <option value="Russian Female">Russian</option>
          <option value="Spanish Female">Spanish</option>
          <option value="Thai Female">Thai</option>
          <option value="Vietnamese Male">Vietnamese</option>
        </select>
      </div>
    );
  }
}
