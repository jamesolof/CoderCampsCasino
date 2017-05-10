namespace Casino.Views.About {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('About', <ng.ui.IState>{
            url: '/about',
            templateUrl: 'js/views/about/about.view.html',
            controller: 'AboutController',
            controllerAs: 'vm'
        });
    }
}