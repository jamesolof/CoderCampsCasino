namespace Casino.Views.Slots {
    let module: ng.IModule = angular.module('View.Slots', []);

    module.controller('SlotsController', Slots.SlotsController);
    module.config(Slots.Configuration);
}