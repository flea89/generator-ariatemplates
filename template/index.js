'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var subgenerator = require('../Subgenerator.js');

var TemplateGenerator = module.exports = function TemplateGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    subgenerator.apply(this, arguments);

    console.log('You called the template subgenerator with the argument ' + this.name + '.');
};

util.inherits(TemplateGenerator, subgenerator);

TemplateGenerator.prototype.files = function files() {
    this.appTemplate('somefile.js', 'somefile.js');
};