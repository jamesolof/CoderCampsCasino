namespace Casino.View.Settings {

    let module: ng.IModule = angular.module('View.Settings', []);
    module.controller('SettingsController', Settings.SettingsController);
    module.config(Settings.Configuration);
}