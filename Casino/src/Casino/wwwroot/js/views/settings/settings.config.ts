namespace Casino.View.Settings {
    Configuration.$inject = [

        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state('Settings', <ng.ui.IState>{
            url: '/settings',
            templateUrl: 'js/views/settings/settings.view.html',
            controller: 'SettingsController',
            controllerAs: 'vm'
        });
    }
}