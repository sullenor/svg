'use strict';

import {EventEmitter} from 'events';
import {inherits} from 'util';

function BasicStore(store) {
  EventEmitter.call(this);
  this._store = store;
}

inherits(BasicStore, EventEmitter);

var proto = BasicStore.prototype;

proto.getStore = function () {
  return this._store;
};

export default BasicStore;
