namespace Casino.Views.Contact {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('Contact', <ng.ui.IState>{
            url: '/contact',
            templateUrl: 'js/views/contact/Contact.view.html',
            controller: 'ContactController',
            controllerAs: 'vm'
        });
    }
}
