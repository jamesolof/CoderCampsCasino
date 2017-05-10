namespace Casino.Views.LeaderBoard {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('LeaderBoard', <ng.ui.IState>{
            url: '/leaderboard',
            templateUrl: 'js/views/leaderboard/leaderboard.view.html',
            controller: 'LeaderBoardController',
            controllerAs: 'vm'
        });
    }
}