'use strict';

import BasicStore from '../modules/BasicStore';
import {hashMap} from 'mori';

var Svg = new BasicStore(hashMap('input', '', 'output', ''));

export default Svg;
