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
    return task;
  },
  whipe: function(id) {
    this.tasks.splice(id, 1);
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
      App.log(this.tasks);
    }
  },
  store: function() {
    var _tasks = JSON.stringify(this.tasks);
    App.log('\n----------------------');
    App.log(  '     this is a        ');
    App.log(  ' LEAN MOAR production ');
    App.log(  '----------------------');
    App.log(_tasks);
    App.log(App.homeDirectory());
    fs.writeFileSync(properties.fileStore, _tasks);
  }
};

module.exports = taskManager;
