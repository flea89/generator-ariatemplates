'use strict';
var util = require('util');
var path = require('path');
var _ = require('underscore.string');
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
            name: 'appName',
            message: 'What do you want to call your application?',
            'default': 'app'
        }
    ];

    this.prompt(prompts, function afterPrompt(props) {
        this.appName = props.appName;
        cb();
    }.bind(this));
};

AriatemplateGenerator.prototype.app = function app() {
    this.mkdir(_.slugify(this.appName));
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_index.html', _.slugify(this.appName) + '/index.html');
    this.template('Gruntfile.js', 'Gruntfile.js');
};

AriatemplateGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};

AriatemplateGenerator.prototype.runtime = function runtime() {
    this.template('_bowerrc', 'bowerrc');
    this.copy('gitignore', '.gitignore');
};