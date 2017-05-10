namespace Casino.Views.Contact {
    let module: ng.IModule = angular.module('View.Contact', []);

    module.controller('ContactController', Contact.ContactController);
    module.config(Contact.Configuration);
}