var CompositeDisposable = require('atom').CompositeDisposable;

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
    console.log('AtomSysAngular generate Module');
  },
  generateController: function() {
    console.log('AtomSysAngular generate Controller');
  },
  generateDirective: function() {
    console.log('AtomSysAngular generate Directive');
  },
  generateRoute: function() {
    console.log('AtomSysAngular generate Route');
  },
  generateService: function() {
    console.log('AtomSysAngular generate Service');
  }
};
