var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var SubGenerator = module.exports = function Generator() {

    yeoman.generators.NamedBase.apply(this, arguments);

    try {
        this.appname = require(path.join(process.cwd(), 'bower.json')).name;
    } catch (e) {
        this.appname = path.basename(process.cwd());
    }

    if (typeof this.env.options.appPath === 'undefined') {
        try {
            this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
        } catch (e) {}
        this.env.options.appPath = this.env.options.appPath || 'app';
    }

    if (typeof this.env.options.testPath === 'undefined') {
        try {
            this.env.options.testPath = require(path.join(process.cwd(), 'bower.json')).testPath;
        } catch (e) {}
        this.env.options.testPath = this.env.options.testPath || 'test/spec';
    }

};

util.inherits(SubGenerator, yeoman.generators.NamedBase);

SubGenerator.prototype.appTemplate = function appTemplate(src, dst) {
    yeoman.generators.Base.prototype.template.apply(this, [
        src,
        path.join(this.env.options.appPath, dst)
    ]);
};
SubGenerator.prototype.appMkdir = function appMkdir(dir) {
    yeoman.generators.Base.prototype.mkdir.apply(this, [
        path.join(this.env.options.appPath, dir)
    ]);
};