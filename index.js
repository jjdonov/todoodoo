#! /usr/bin/env node

var commander = require('commander');
var todo = require('./todo');
var taskManager = require('./taskmanager');
var fs = require('fs');
var properties = require('./properties');
var mgr = (function() {
  var raw = fs.readFileSync(properties.fileStore,
    properties.fileOptions);
  var tasks = JSON.parse(raw, function(k, v) {
    if (v instanceof Object && v._type === 'todo') {
      return todo.thaw(v);
    }
    return v;
  });
  return new taskManager(tasks);
}());

commander
  .version('0.0.0');
commander
  .command('dump')
  .description('Tells you what you need to do.')
  .action(function() {
    mgr.dump();
  });
commander
  .command('flush')
  .description('Deletes all tasks')
  .action(function() {
    mgr.flush();
  });
commander
  .command('add [desc...]')
  .description('Create a new task with the description')
  .action(function(taskDesc) {
    mgr.create(taskDesc);
    mgr.store();
  });
commander.parse(process.argv);
