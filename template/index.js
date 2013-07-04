'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var subgenerator = require('../Subgenerator.js');
var path = require('path');

var TemplateGenerator = module.exports = function TemplateGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    subgenerator.apply(this, arguments);

    // console.log('You called the template subgenerator with the argument ' + this.name + '.');
};

util.inherits(TemplateGenerator, subgenerator);

TemplateGenerator.prototype.files = function files() {
    var pathArray = this.name.split('.'),
        base = pathArray[0],
        name = pathArray.pop(),
        templatePath = path.join.apply(null, pathArray);

    if (base !== 'view') {
        console.log('The template path should be in view directory');
        return;
    }
    if (name[0].toLowerCase() === name[0]) {
        console.log('Your template class has to be capital letter');
        return;
    }
    this.templateClass = this.name;
    this.templateScriptClass = this.name + 'Script';


    this.appTemplate('template.tpl', templatePath + '/' + name + '.tpl');
    this.appTemplate('templateScript.js', templatePath + '/' + name + 'Script.js');
};