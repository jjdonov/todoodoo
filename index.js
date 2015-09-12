#! /usr/bin/env node

var commander = require('commander');
var taskManager = require('./taskManager');

var mgr = taskManager.thaw();

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
  .command('whipe')
  .description('remove the first todo')
  .action(function() {
    mgr.whipe();
  });
commander
  .command('add [desc...]')
  .description('Create a new task with the description')
  .action(function(taskDesc) {
    mgr.create(taskDesc);
  });
commander.parse(process.argv);
