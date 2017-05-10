namespace Casino.Views.Roulette {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('Roulette', <ng.ui.IState>{
            url: '/roulette',
            templateUrl: 'js/views/roulette/roulette.view.html',
            controller: 'RouletteController',
            controllerAs: 'vm'
        });
    }
}