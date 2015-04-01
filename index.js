#! /usr/bin/env node

var emoji = require('node-emoji').emoji;
var commander = require('commander');

var App = function() {
  this.preamble = emoji.hankey + '\t';
}

App.prototype.log = function(args) {
  console.log(this.preamble + args);
}
App.prototype = Object.create(App.prototype);
App.prototype.constructor = App;

var doodoo = new App();

commander
  .version('0.0.0');
commander
  .command('dump')
  .description('Tells you what you need to do.')
  .action(function() {
    show();
  });
commander.parse(process.argv);

function show() {
  doodoo.log("You got nothing to do.");
}
