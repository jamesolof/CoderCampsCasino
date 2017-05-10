namespace Casino.Views.Blackjack {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('Blackjack', <ng.ui.IState>{
            url: '/blackjack',
            templateUrl: 'js/views/blackjack/blackjack.view.html',
            controller: 'BlackjackController',
            controllerAs: 'vm'
         

         

            //{ images: Factories.imageFactory },
            //{image: }
        });
}
}
