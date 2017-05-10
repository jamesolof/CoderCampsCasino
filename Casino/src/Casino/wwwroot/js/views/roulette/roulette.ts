namespace Casino.Views.Roulette {
    let module: ng.IModule = angular.module('View.Roulette', []);

    module.controller('RouletteController', Roulette.RouletteController);
    module.config(Roulette.Configuration);
}