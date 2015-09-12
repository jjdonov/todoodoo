var todo = require('./todo');
var fs = require('fs');
var properties = require('./properties');
var App = require('./app');

//if task manager can save the tasks, why cant they delete them too?
var taskManager = function(tasks) {
  this.tasks = tasks || [];
};

taskManager.prototype = {
  constructor: taskManager,
  create: function(taskDesc) {
    var task = new todo(taskDesc);
    this.tasks.push(task);
    this.store(task);
    return task;
  },
  whipe: function(id) {
    if (!id) {
      id = 0;
    }
    this.tasks.splice(id, 1);
    this.store();
  },
  flush: function() {
    App.log(this.tasks);
    this.tasks = [];
    this.store();
  },
  dump: function() {
    if (this.tasks.length === 0) {
      App.log('nuttin');
    } else {
      this.tasks.map(function(task, index) {
        if (index !== 0) {
          App.log();
        }
        App.log(task);
      });
    }
  },
  store: function() {
    fs.writeFileSync(properties.fileStore, JSON.stringify(this.tasks));
  }
};

taskManager.thaw = function() {
  var raw = fs.readFileSync(properties.fileStore,
    properties.fileOptions);
  var tasks = JSON.parse(raw, function(k, v) {
    if (v instanceof Object && v._type === 'todo') {
      return todo.thaw(v);
    }
    return v;
  });
  return new taskManager(tasks);
};

module.exports = taskManager;
