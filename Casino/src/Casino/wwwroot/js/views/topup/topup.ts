namespace Casino.Views.TopUp {
    let module: ng.IModule = angular.module('View.TopUp', []);

    module.controller('TopUpController', TopUp.TopUpController);
    module.config(TopUp.Configuration);
}