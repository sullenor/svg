'use strict';

import {assoc, get} from 'mori';
import optimize from '../modules/optimize';
import Svg from '../stores/Svg';

export default function minify() {
  optimize(Svg.get('input'), function (err, str) {
    var result = err && err.toString() || str;
    Svg.set('output', str);
    Svg.emit('change', str);
  });
}
