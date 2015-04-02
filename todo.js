var App = require('./app');

var todo = function todo(name, isCompleted, timeStamp) {
  var self = this;
  this.name = name;
  this.isCompleted = isCompleted || false;
  this.timeStamp = timeStamp || new Date();
  this._type = 'todo';
};

todo.prototype.toString = function toString() {
    return "\npooo" + JSON.stringify(this);
};

todo.thaw = function thaw(obj) {
  return new todo(obj.name, obj.isCompleted, obj.timeStamp);
};

todo.prototype.constructor = todo;

module.exports = todo;
