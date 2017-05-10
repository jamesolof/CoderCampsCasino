namespace Casino.View.Settings{
    export class SettingsController {
        public get user(): Models.UserModel {
            return this.UserService.user;
        }

        public navColor: HTMLElement = document.getElementById('navColorpicker');
        public backGColor: HTMLElement = document.getElementById('body');
        static $inject = [
            'PlayerService',
            'UserService'
        ];

        constructor(
            private PlayerService: Services.PlayerService,
            private UserService: Services.UserService
        ) { 
            console.log(this.user.tokens)

        }

        public userTokens(t): boolean {
            if (this.user.tokens >= t) {
                return true;
            }
            else {
                return false;
            }
        }

        public colorPicker(nums: number) {
            let that = this;
            if (nums == 1) {
                this.navColor.style.backgroundColor = "red";
                this.PlayerService.updateNavColor(this.user, "red");
               
            }
            if (nums == 2) {
                this.navColor.style.backgroundColor = "blue";
                this.PlayerService.updateNavColor(this.user, "blue");
               
            }
            if (nums == 3) {
                this.navColor.style.backgroundColor = "black";
                this.PlayerService.updateNavColor(this.user, "black")
            }
            if (nums == 4) {
                this.navColor.style.backgroundColor = "orange";
                this.PlayerService.updateNavColor(this.user, "orange")
            }
            if (nums == 5) {
                this.navColor.style.backgroundColor = "";
                this.PlayerService.updateNavColor(this.user, "")
            }

        }


        public colorPicker2(nums: number) {
            if (nums == 1) {
                this.backGColor.style.backgroundColor = "red";
                this.backGColor.style.color = "white";
                this.PlayerService.updateBackgroundColor(this.user, "red");

            }
            if (nums == 2) {
                this.backGColor.style.backgroundColor = "blue";
                this.backGColor.style.color = "white";
                this.PlayerService.updateBackgroundColor(this.user, "blue");
            }
            if (nums == 3) {
                this.backGColor.style.backgroundColor = "black";
                this.backGColor.style.color = "white";
                this.PlayerService.updateBackgroundColor(this.user, "black");
            }
            if (nums == 4) {
                this.backGColor.style.backgroundColor = "orange";
                this.backGColor.style.color = "white";
                this.PlayerService.updateBackgroundColor(this.user, "orange");
            }
            if (nums == 5) {
                this.backGColor.style.backgroundColor = "";
                this.backGColor.style.color = "";
                this.PlayerService.updateBackgroundColor(this.user, "");

            }

        }
    } // end controller

}// end settings nspace
