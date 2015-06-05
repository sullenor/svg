'use strict';

import React, {Component} from 'react';
import {partial, reduceKV, toClj} from 'mori';

var buildClass = function (base, acc, key, val) {
  return Boolean(val)
    ? acc + ' ' + base + '_' + key + '_' + val
    : acc;
};

export default class Classes extends Component {
  constructor(props) {
    super(props);

    var mods = toClj(props.mods || {});

    var f = partial(buildClass, props.baseClassName);
    var className = reduceKV(f, props.baseClassName, mods);

    this.state = {className: className};
  }

  render() {
    return null;
  }
}

Classes.propTypes = {baseClassName: React.PropTypes.string.isRequired};
