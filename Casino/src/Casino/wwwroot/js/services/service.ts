namespace Casino.Services {
    let module: ng.IModule = angular.module('Casino.Services', []);
    module.service('RegistrationService', Services.RegistrationService);
    module.service('UserService', Services.UserService);
    module.service('PlayerService', Services.PlayerService);
    module.service('SettingsService', Services.SettingsService);


}
