'use strict';

import * as React from 'react';

export default class Textarea extends React.Component {
  render() {
    return (<textarea {...this.props}></textarea>);
  }
}
