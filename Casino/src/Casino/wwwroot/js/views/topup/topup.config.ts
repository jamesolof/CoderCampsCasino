namespace Casino.Views.TopUp {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('TopUp', <ng.ui.IState>{
            url: '/topup',
            templateUrl: 'js/views/topup/topup.view.html',
            controller: 'TopUpController',
            controllerAs: 'vm'
        });
    }
}
