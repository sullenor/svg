'use strict';

import {EventEmitter} from 'events';
import {inherits} from 'util';
import {assoc, get, partial} from 'mori';

function BasicStore(data) {
  EventEmitter.call(this);
  this._store = data;
}

inherits(BasicStore, EventEmitter);

var proto = BasicStore.prototype;

proto.getAll = function () {
  return this._store;
};

proto.setAll = function (data) {
  this._store = data;
};

proto.get = function () {
  return partial(get, this._store).apply(null, arguments);
};

proto.set = function () {
  this._store = partial(assoc, this._store).apply(null, arguments);
};

export default BasicStore;
