'use strict';

import React, {Component} from 'react';
import {assoc, get, toJs} from 'mori';
import minify from '../actions/minify';

import Button from './button.jsx';
import Textarea from './textarea.jsx';

import Svg from '../stores/Svg';

class Minifier extends Component {
  constructor() {
    super();
    this.state = toJs(Svg);
  }

  componentDidMount() {
    Svg.on('change', (output) => {
      this.setState({output: output})
    });
  }

  componentWillUnmount() {
    Svg.removeListeners('change');
  }

  _onChange(e) {
    var value = e.target.value;
    Svg.set('input', value);
    this.setState({input: value});
  }

  _reset() {
    this.setState({input: '', output: ''});
  }

  render() {
    return (
      <div className="minifier">
        <Textarea
          className='minifier__input'
          onChange={this._onChange.bind(this)}
          value={this.state.input} />
        <Textarea
          className='minifier__output'
          value={this.state.output} />
        <Button
          mods={{theme: 'normal'}}
          onClick={this._reset.bind(this)}>Reset</Button>
        <Button
          mods={{theme: 'action'}}
          onClick={minify}>Minify</Button>
      </div>
    );
  }
}

export default Minifier;
