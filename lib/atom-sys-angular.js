var CompositeDisposable = require('atom').CompositeDisposable;
var NewDialog = require('./new-dialog');
var dialogs = {};

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
    attachDialog('module');
  },
  generateController: function() {
    attachDialog('controller');
  },
  generateDirective: function() {
    attachDialog('directive');
  },
  generateRoute: function() {
    attachDialog('route');
  },
  generateService: function() {
    attachDialog('service');
  }
};

function attachDialog(type) {
  if (!dialogs[type]) {
    dialogs[type] = new NewDialog(type);
  }
  dialogs[type].attach();
}
