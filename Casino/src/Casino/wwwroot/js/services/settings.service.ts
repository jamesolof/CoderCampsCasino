namespace Casino.Services {

    export class SettingsService {

        public backGColor: HTMLElement = document.getElementById('body');
        public navColor: HTMLElement = document.getElementById('navColorpicker');

        static $inject = [];
        constructor(

        ) {

        }

        public userSettings(user: Models.UserModel) {

            this.backGColor.style.backgroundColor = user.backgroundColor;
            this.navColor.style.backgroundColor = user.navBarColor;
            console.log(user.backgroundColor);
            if (user.backgroundColor == "") {

            }
            else {
                this.backGColor.style.color = "white";
            }

        }
    }

}