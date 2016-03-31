var CompositeDisposable = require('atom').CompositeDisposable;
var NewDialog = require('./new-dialog');

var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();

var dialogs = {};

env.register(require.resolve('generator-angular'), 'angular');

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
  generateModule: function() {
    attachDialog('module', generateModule);
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

function attachDialog(type, cb) {
  if (!dialogs[type]) {
    dialogs[type] = new NewDialog(type, cb);
  }
  dialogs[type].attach();
}

function generateModule() {
  console.log('generate module');
  env.run('angular', {'skip-install': true}, function (err) {
    console.log('done');
    console.log(err);
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
