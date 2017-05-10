namespace Casino.Factories {
    let module: ng.IModule = angular.module('Casino.Factories', []);

    module.factory('AuthenticationInterceptor', Factories.AuthenticationInterceptor);

}