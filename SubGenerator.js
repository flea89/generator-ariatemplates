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
    this.option('coffee');
    this.fileSuffix = '';

};

util.inherits(SubGenerator, yeoman.generators.NamedBase);

SubGenerator.prototype.appTemplate = function appTemplate(src, dst, fileExtension) {
    //If fileExtension is not provided, this.fileSuffix is used instead 
    var fileSuffix = fileExtension || this.fileSuffix;
    yeoman.generators.Base.prototype.template.apply(this, [
        src + fileSuffix,
        path.join(this.env.options.appPath, dst + fileSuffix)
    ]);
};
SubGenerator.prototype.pathFromClassPath = function pathFromClassPath(classPath) {
    var pathArray = classPath.split('.'),
        base = pathArray[0],
        name = pathArray.pop(),
        filePath = path.join.apply(null, pathArray);
    return {
        fileName: name,
        filePath: filePath,
        basePath: base
    };
};
SubGenerator.prototype.appMkdir = function appMkdir(dir) {
    yeoman.generators.Base.prototype.mkdir.apply(this, [
        path.join(this.env.options.appPath, dir)
    ]);
};