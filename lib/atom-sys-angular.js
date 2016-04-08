var CompositeDisposable = require('atom').CompositeDisposable;
var NewDialog = require('./new-dialog');

var yeoman = require('yeoman-environment');
var path = require('path');
var sysAngular = require.resolve('generator-sys-angular');

var env = yeoman.createEnv();
env.register(path.resolve(sysAngular, '../../module/index.js'), 'sys-angular:module');

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
  generateModule: function(e) {
    attachDialog('module', generateModule, e);
  },
  generateController: function() {
    attachDialog('controller', generateController);
  },
  generateDirective: function() {
    attachDialog('directive', generateDirective);
  },
  generateRoute: function() {
    attachDialog('route', generateRoute);
  },
  generateService: function() {
    attachDialog('service', generateService);
  }
};

function getPath(e) {
  var target = e.target || e;
  if (target.attributes) {
    var dataPath = target.attributes['data-path'];
    if (dataPath) {
      return dataPath.value;
    }
  }

  if (target.childNodes && target.childNodes.length) {
    for (var i = 0; i < target.childNodes.length; i ++) {
      var nodePath = getPath(target.childNodes[i]);
      if (nodePath) {
        return nodePath;
      }
    }
  }

  return null;
}

function attachDialog(type, cb, e) {
  if (!dialogs[type]) {
    dialogs[type] = new NewDialog(type, cb);
  }
  dialogs[type].showDialog(getPath(e));
}

function generateModule(input, folderPath) {
  folderPath = path.resolve(folderPath, input);
  allowUnsafe(function() {
    env.run('sys-angular:module ' + folderPath, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });

}

function generateController() {
  console.log('generate controller');
}

function generateDirective() {
  console.log('generate directive');
}

function generateRoute() {
  console.log('generate route');
}

function generateService() {
  console.log('generate service');
}

function allowUnsafe(fn) {
  return loophole.allowUnsafeEval(function() {
    return loophole.allowUnsafeNewFunction(function() {
      return fn();
    });
  });
}
