'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var subgenerator = require('../Subgenerator.js');
var path = require('path');

var TemplateGenerator = module.exports = function TemplateGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    subgenerator.apply(this, arguments);
    this.fileSuffix = '.tpl';

};

util.inherits(TemplateGenerator, subgenerator);

TemplateGenerator.prototype.files = function files() {
    var pathInfo = this.pathFromClassPath(this.name),
        scriptFileSuffix;

    scriptFileSuffix = this.options.coffee ? '.coffee' : '.js';

    if (pathInfo.basePath !== 'view') {
        console.log('The template path should be in view directory');
        return;
    }
    if (pathInfo.fileName[0].toLowerCase() === pathInfo.fileName[0]) {
        console.log('Your template class has to be capital letter');
        return;
    }

    this.templateClass = this.name;
    this.templateScriptClass = this.name + 'Script';

    this.appTemplate('template', pathInfo.filePath + '/' + pathInfo.fileName);
    this.appTemplate('templateScript', pathInfo.filePath + '/' + pathInfo.fileName + 'Script', scriptFileSuffix);
};