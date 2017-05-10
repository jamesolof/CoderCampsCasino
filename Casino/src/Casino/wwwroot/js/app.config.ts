namespace Casino {
    Configuration.$inject = [
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider'
    ];
    export function Configuration(
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        $httpProvider: ng.IHttpProvider,
    ){

        $httpProvider.interceptors.push('AuthenticationInterceptor');
        //handle default route
        $urlRouterProvider.otherwise('/');

        //set HTML5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
    }
}