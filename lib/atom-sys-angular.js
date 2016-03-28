var CompositeDisposable = require('atom').CompositeDisposable;

module.exports = {
  subscriptions: null,
  activate: function(state) {
    this.subscriptions = new CompositeDisposable();
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-sys-angular:generate': this.generate
    }));
  },
  deactivate: function() {
    this.subscriptions.dispose();
  },
  generate: function() {
    console.log('AtomSysAngular was toggled!');
  }
};
