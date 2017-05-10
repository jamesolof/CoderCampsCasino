namespace Casino {
    export class AppController {
        public friendsViz: boolean = false;


        public get isUserLoggedIn() {
            return this.UserService.isLoggedIn;
        }
        public get user(): Models.UserModel {
            return this.UserService.user;
        }
        public logOut(): void {
            this.UserService.logOut();
            this.$state.go('Home');
        }
        static $inject = [
            'UserService',
            '$state',
        ];

        constructor(
            private UserService: Services.UserService,
            private $state: ng.ui.IStateService,
        ) {
      
        }

        public showFriends() {
            if (!this.friendsViz) {
                $(document.body).append('<p id="friendslist">here is your friendslist</p>');
                this.friendsViz = true;
                console.log("show")

            }
            else {
                $("#friendslist").slideToggle();
            }

        }



    }
}