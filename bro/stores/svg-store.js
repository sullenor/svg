'use strict';

import {EventEmitter} from 'events';
import {inherits} from 'util';

import optimize from '../modules/optimize';

function SVGStore() {
  EventEmitter.call(this);
  this._input = '';
  this._output = 'test';
}

inherits(SVGStore, EventEmitter);

var proto = SVGStore.prototype;

proto.getInput = function () {
  return this._input;
};

proto.getOutput = function () {
  return this._output;
};

proto.minify = function () {
  optimize(this._input, (err, text) => {
    this._output = err && err.toString() || text;
    this.emit('change');
  });
};

proto.setInput = function (text) {
  this._input = text;
};

proto.reset = function () {
  this._input = '';
  this._output = '';
  this.emit('change');
};

export default new SVGStore();
