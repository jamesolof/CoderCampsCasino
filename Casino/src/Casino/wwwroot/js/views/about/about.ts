namespace Casino.Views.About {
    let module: ng.IModule = angular.module('View.About', []);

    module.controller('AboutController', About.AboutController);
    module.config(About.Configuration);
}