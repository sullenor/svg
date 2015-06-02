'use strict';

import * as React from 'react';

import Button from '../button/button.jsx';
import Textarea from '../textarea/textarea.jsx';

import Store from '../../stores/svg-store';

function minify() {
  Store.minify();
}

function reset() {
  Store.reset();
}

function updateStoresInput(e) {
  Store.setInput(e.target.value);
}

export default class Minifier extends React.Component {
  constructor() {
    super();
    this.state = {output: Store.getOutput()};
  }

  componentDidMount() {
    Store.on('change', () => {
      this.setState({output: Store.getOutput()});
    });
  }

  componentWillUnmount() {
    Store.removeListeners('change');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.output !== this.state.output;
  }

  render() {
    return (<div className='minifier'>
      <Textarea
        className='minifier__input'
        name='input'
        onChange={updateStoresInput}></Textarea>
      <Textarea
        className='minifier__output'
        name='output'
        value={this.state.output}></Textarea>
      <Button
        type='button'
        onClick={minify}>Minify</Button>
      <Button
        type='button'
        onClick={reset}>Reset</Button>
    </div>);
  }
}
