namespace Casino.Services {
    export class LoginService {
       
        static $inject = [
            '$http'
        ];

        constructor(
            private $http: ng.IHttpService
        ) {
        }

        public loginUser(user: Models.LoginViewModel): ng.IPromise<boolean> {
            return this.$http.post<boolean>('api/account/login', user, <ng.IRequestShortcutConfig>{
                cache: false
            })
                .then((response) => {
                    console.info('User login was successful.');
                   
                    return true;
                })
                .catch(() => {
                    console.info('User was not logged in.');
                    return false;
                });

        }
    }
}