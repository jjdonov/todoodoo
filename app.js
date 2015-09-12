var emoji = require('node-emoji').emoji;
var path = require('path');
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var todo = require('./todo');

var App = (function() {
  function _log(args) {
    if (!args) {
      printLine('');
      return;
    }
    args = args.toString();
    var lines = args.split('\n');
    lines.forEach(printLine);
  }

  function printLine(line, i) {
    var preamble = emoji.hankey + ' ';
    console.log(preamble + line.toString());
  }

  return {
    log: function(args) {
      if (Array.isArray(args)) {
        args.map(this.log);
      } else {
        _log(args);
      }
    },
    homeDirectory: function(username) {
      return username ? path.resolve(path.dirname(home), username) : home;
    }
  };
}());
module.exports = App;
