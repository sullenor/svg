'use strict';

import React, {Component} from 'react';
import Classes from './Classes.jsx';

export default class Button extends Classes {
  render() {
    return (<button className={this.state.className}
      {...this.props}>{this.props.children}</button>);
  }
}

Button.defaultProps = {baseClassName: 'button'};
