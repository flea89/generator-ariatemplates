'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AriatemplateGenerator = module.exports = function AriatemplateGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AriatemplateGenerator, yeoman.generators.Base);

AriatemplateGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
            name: 'application name',
            message: 'What do you want to call your application?',
            default: 'app'
        }
    ];

    this.prompt(prompts, function(props) {
        this.someOption = props.someOption;

        cb();
    }.bind(this));
};

AriatemplateGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

AriatemplateGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};