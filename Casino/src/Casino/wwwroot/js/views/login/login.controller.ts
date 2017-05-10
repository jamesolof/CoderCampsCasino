namespace Casino.Views.Login {
    export class LoginController {
        public loginData: Models.LoginViewModel = new Models.LoginViewModel

  
         

        static $inject = [
            'UserService',
            '$state'
        ];

        constructor(
            private UserService: Services.LoginService,
            private $state: ng.ui.IStateService
        ) {
          

        }

   

        public loginUser(): void {
            this.UserService
                .loginUser(this.loginData)
                .then((result: boolean) => {
                    if (result) {
                        this.$state.go('Home');
                    }
                });
        }
    }
}