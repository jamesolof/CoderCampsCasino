namespace Casino.Views.Blackjack {
    let module: ng.IModule = angular.module('View.Blackjack', []);

    module.controller('BlackjackController', Blackjack.BlackjackController);
    module.config(Blackjack.Configuration);
}