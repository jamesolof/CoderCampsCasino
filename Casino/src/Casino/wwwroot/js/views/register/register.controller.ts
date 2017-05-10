namespace Casino.Views.Register {
    export class RegisterController {
        public formData: Models.RegisterViewModel = new Models.RegisterViewModel;
        //public pattern: string = '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}';


        static $inject = [
            'RegistrationService',
            '$state'
        ];
        constructor(
            private RegistrationService: Services.RegistrationService,
            private $state: ng.ui.IStateService

        ) {

        }
        public registerUser(): void {

            this.RegistrationService
                .registerUser(this.formData)
                .then((result: boolean) => {
                    if (result) {
                        this.$state.go('Login');
                    }

                });
        }

    }
}