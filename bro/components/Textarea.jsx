'use strict';

import React, {Component} from 'react';

class Textarea extends Component {
  render() {
    return (<textarea {...this.props}></textarea>);
  }
}

export default Textarea;
