var App = require('./app');
var fmt = require('string-template');

var todo = function todo(name, isCompleted, timeStamp) {
  var self = this;
  if(Array.isArray(name)) {
    name = name.join(' ');
  }
  this.name = name;
  this.isCompleted = isCompleted || false;
  this.timeStamp = timeStamp || new Date();
  this._type = 'todo';
};

todo.prototype.toString = function toString() {
    var template = 'Name:\t{name}\nStatus:\t{isCompleted}\nCreated:\t{timeStamp}';
    return fmt(template, this);
};

todo.thaw = function thaw(obj) {
  return new todo(obj.name, obj.isCompleted, obj.timeStamp);
};

todo.prototype.constructor = todo;

module.exports = todo;
