namespace Casino {
    let module: ng.IModule = angular.module('app', [
        'ui.router',
        'ngResource',
        'ui.bootstrap',

        'Casino.Factories',
        'Casino.Services',
        'Casino.Views'
    ]);

    module.controller('AppController', Casino.AppController);
    module.config(Casino.Configuration);
    module.controller('FriendsController', Casino.Views.Friends.FriendsController);

    module.component('friendsList', {
        templateUrl: 'js/views/friends/friends.view.html',
        controller: 'FriendsController',
        controllerAs: 'vm'
        
        });
}