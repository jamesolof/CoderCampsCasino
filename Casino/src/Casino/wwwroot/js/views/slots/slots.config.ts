namespace Casino.Views.Slots {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('Slots', <ng.ui.IState>{
            url: '/slots',
            templateUrl: 'js/views/slots/slots.view.html',
            controller: 'SlotsController',
            controllerAs: 'vm'
        });
    }
}
