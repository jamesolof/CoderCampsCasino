namespace Casino.Views.TopUp {
    export class TopUpController {


        public Appuser: Models.UserModel;
        public get user(): Models.UserModel {
            return this.UserService.user;
        }
        public get isUserLoggedIn() {
            return this.UserService.isLoggedIn;
        }

        static $inject = [
            'PlayerService',
            'UserService'
        ];

        constructor(
            private PlayerService: Services.PlayerService,
            private UserService: Services.UserService
        ) {
            this.Appuser = this.UserService.authUser
            
        }

        public isAdmin(): boolean {
            return this.UserService.isLoggedIn &&
                this.UserService.user.isAdmin;
        }

        public addTokens(tokens: number) {
            this.PlayerService.updateTokens(this.Appuser, tokens);
        }
    }
}