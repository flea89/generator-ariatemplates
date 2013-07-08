Aria.classDefinition
    $classpath: '<%= controllerClass %>'
    $extends: 'aria.templates.ModuleCtrl'
    $implements: ['<%= controllerInterfaceClass %>']
    $constructor: () ->
        this.$ModuleCtrl.constructor.call(this);
    $destructor: () ->
        this.$ModuleCtrl.$destructor.call(this);
    $prototype: 
        $publicInterfaceName: '<%= controllerInterfaceClass %>',
    