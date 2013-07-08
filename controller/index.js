'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var SubGenerator = require('../SubGenerator');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    SubGenerator.apply(this, arguments);
    console.log(path.join(process.cwd(), 'bower.json'));
    try {
        this.controllerPath = require(path.join(process.cwd(), 'bower.json')).controllerPath || './';
    } catch (e) {
        console.log('Bower.json isn\'t a valid JSON');
        this.controllerPath = './';
    }

    this.fileSuffix = this.options.coffee ? '.coffee' : '.js';

};

util.inherits(ControllerGenerator, SubGenerator);

ControllerGenerator.prototype.files = function files() {
    var pathInfo = this.pathFromClassPath(this.name);

    if (this.controllerPath !== './' && pathInfo.basePath !== this.controllerPath) {
        console.log('The controller base-path should be the one configured (bower.json).'.red);
        return;
    }
    if (pathInfo.fileName[0].toLowerCase() === pathInfo.fileName[0]) {
        console.log('Your Controller class has to be capital letter');
        return;
    }
    this.controllerClass = this.name;
    this.controllerInterfaceClass = this.name + 'Interface';

    this.appTemplate('Controller', pathInfo.filePath + '/' + pathInfo.fileName);
    this.appTemplate('ControllerInterface', pathInfo.filePath + '/' + pathInfo.fileName + 'Interface');
};