namespace Casino.Views.Home {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('Home', <ng.ui.IState>{
            url: '/',
            templateUrl: 'js/views/home/home.view.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        });
    }
}