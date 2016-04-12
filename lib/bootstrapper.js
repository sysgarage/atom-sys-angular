"use strict";
var _ = require('./lodash');
var generatorService;
var sysAngular;
var Bootstrapper = (function () {
    function Bootstrapper() {
        this.config = {};
    }
    Bootstrapper.prototype.activate = function (state) {
        if (!sysAngular)
            sysAngular = require('./atom-sys-angular');
        sysAngular.activate(state);
    };
    Bootstrapper.prototype.deactivate = function () {
        sysAngular.deactivate();
    };
    return Bootstrapper;
}());
var instance = new Bootstrapper;
module.exports = instance;
