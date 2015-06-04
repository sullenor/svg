'use strict';

import {assoc, get} from 'mori';
import optimize from '../modules/optimize';
import Svg from '../stores/Svg';

export default function minify() {
  optimize(get(Svg.getStore(), 'input'), function (err, result) {
    var output = err && err.toString() || result;
    assoc(Svg.getStore(), 'output', output);
    Svg.emit('change', get(Svg.getStore(), 'output'));
  });
}
