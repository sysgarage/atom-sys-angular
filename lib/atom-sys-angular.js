var CompositeDisposable = require('atom').CompositeDisposable;
var NewDialog = require('./new-dialog');

var yeoman = require('yeoman-environment');
var path = require('path');
var fs = require('fs');
var sysAngular = require.resolve('generator-sys-angular');

var env = yeoman.createEnv();
env.register(path.resolve(sysAngular, '../../module/index.js'), 'sys-angular:module');
env.register(path.resolve(sysAngular, '../../controller/index.js'), 'sys-angular:controller');
env.register(path.resolve(sysAngular, '../../directive/index.js'), 'sys-angular:directive');
env.register(path.resolve(sysAngular, '../../route/index.js'), 'sys-angular:route');
env.register(path.resolve(sysAngular, '../../service/index.js'), 'sys-angular:service');

var dialogs = {};

var loophole = require("loophole");
loophole.Function.prototype = Function.prototype;

module.exports = {
  subscriptions: null,
  activate: function(state) {
    this.subscriptions = new CompositeDisposable();
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-sys-angular:generate-module': this.generateModule,
      'atom-sys-angular:generate-controller': this.generateController,
      'atom-sys-angular:generate-directive': this.generateDirective,
      'atom-sys-angular:generate-route': this.generateRoute,
      'atom-sys-angular:generate-service': this.generateService
    }));
  },
  deactivate: function() {
    this.subscriptions.dispose();
  },
  generateModule: function(ev) {
    attachDialog('module', generateModule, ev);
  },
  generateController: function(ev) {
    callGenerator('', ev, 'controller');
  },
  generateDirective: function(ev) {
    attachDialog('directive', generateDirective, ev);
  },
  generateRoute: function(ev) {
    callGenerator('', ev, 'route');
  },
  generateService: function(ev) {
    var folderPath = getPath(ev);
    try {
      fs.accessSync(path.resolve(folderPath, 'services.module.js'), fs.F_OK);
      attachDialog('service', generateService, ev);
    } catch (e) {
      callGenerator('', ev, 'service');
    }
  }
};

function getPath(ev) {
  var target = ev.target || ev;
  if (target.attributes) {
    var dataPath = target.attributes['data-path'];
    if (dataPath) {
      return dataPath.value;
    }
  }

  if (target.childNodes && target.childNodes.length) {
    for (var i = 0; i < target.childNodes.length; i++) {
      var nodePath = getPath(target.childNodes[i]);
      if (nodePath) {
        return nodePath;
      }
    }
  }

  return null;
}

function attachDialog(type, cb, ev) {
  if (!dialogs[type]) {
    dialogs[type] = new NewDialog(type, cb);
  }
  dialogs[type].showDialog(ev);
}

function callGenerator(input, ev, generatorName) {
  folderPath = path.resolve(getPath(ev), input);
  allowUnsafe(function() {
    env.run('sys-angular:' + generatorName + ' ' + folderPath + ' ' + input, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
}

function generateModule(input, ev) {
  callGenerator(input, ev, 'module');
}

function generateDirective(input, ev) {
  callGenerator(input, ev, 'directive');
}

function generateService(input, ev) {
  callGenerator(input, ev, 'service');
}

function allowUnsafe(fn) {
  return loophole.allowUnsafeEval(function() {
    return loophole.allowUnsafeNewFunction(function() {
      return fn();
    });
  });
}
