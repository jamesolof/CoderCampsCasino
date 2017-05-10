namespace Casino.Services {
    export class UserService {
        private isUserLoggedIn: boolean = false;
        public authUser: Models.UserModel = new Models.UserModel();
        public availableFriends: Models.friendModel[] = [];

        public get isLoggedIn(): boolean {
            return this.isUserLoggedIn;
        }

        public get user(): Models.UserModel {
            return this.authUser;
        }




        static $inject = [
            '$http',
            '$window',
            'SettingsService'
        ];

        constructor(
            private $http: ng.IHttpService,
            private $window: ng.IWindowService,
            private SettingsService: Services.SettingsService
        ) {
            this.getSessionData();
        }

        public getAllUsers(): ng.IPromise<void> {
            return this.$http.get<Models.friendModel[]>('api/account')
                .then((response) => {
                    this.availableFriends = response.data;
                    return console.log("good")
                })
                .catch(() => {
                    return console.log("bad");
                });
        }

        private clearSession(): void {
            this.$window.sessionStorage.clear();
            this.authUser = Models.UserModel.GetAnonymousUser();
            this.isUserLoggedIn = false;
        }
        public getSessionData() {
            let user = this.$window.sessionStorage.getItem('user');

            if (user) {
                this.authUser = <Models.UserModel>JSON.parse(user);
                this.SettingsService.userSettings(this.authUser);
                return;
            }
            this.authUser = Models.UserModel.GetAnonymousUser();
            return;
        }

        public updateSession(user: Models.UserModel): boolean {
            var encodedUser = JSON.stringify(user);

            if (encodedUser) {
                this.$window.sessionStorage.setItem('user', encodedUser);
                return true;
            }
            this.clearSession();
            return false;
        }

        public logOut(): void {
            this.$http.post<Models.UserModel>('api/account/LogOff', <ng.IRequestShortcutConfig>{
                cache: false
            })
                .then((response) => {
                    console.info('User login was logged out.');
                    this.authUser = null;
                    this.isUserLoggedIn = false;

                })
                .catch(() => {
                    this.clearSession();
                    console.info('User was not logged out.')
                });
        }

        public loginUser(user: Models.LoginViewModel): ng.IPromise<boolean> {
            return this.$http.post<Models.UserModel>('api/account/login', user, <ng.IRequestShortcutConfig>{
                cache: false
            })
                .then((response) => {
                    console.log(response.data);
                    console.info('User login was successful.');
                    this.authUser = response.data;
                    this.SettingsService.userSettings(this.authUser);
                    this.isUserLoggedIn = true;

                    return this.updateSession(response.data);
                })
                .catch(() => {
                    console.info('User was not logged in.');
                    return this.updateSession(null);
                });

        }
    }
}