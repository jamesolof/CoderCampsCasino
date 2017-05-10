namespace Casino.Services {
    export class RegistrationService {
        static $inject = [
            '$http'
        ];
        constructor(
            private $http: ng.IHttpService
        ) {
        }

        public registerUser(user: Models.RegisterViewModel): ng.IPromise<boolean> {
            return this.$http.post<boolean>('api/account/register', user, <ng.IRequestShortcutConfig>{

                cache: false
            })
                .then((response) => {
                    console.info('User was succesfully created.');
                    return true;
                })
                .catch(() => {
                    console.info('User was not created');
                    return false;
                });
        }
    }
}