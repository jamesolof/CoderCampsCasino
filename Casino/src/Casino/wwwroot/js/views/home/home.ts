namespace Casino.Views.Home {
    let module: ng.IModule = angular.module('View.Home', []);

    module.controller('HomeController', Home.HomeController);
    module.config(Home.Configuration);
}