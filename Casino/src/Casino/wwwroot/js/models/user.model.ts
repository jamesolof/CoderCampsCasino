namespace Casino.Models {
    export class UserModel {
        public userName: string = '';
        public nickname: string = '';
        public isAdmin: boolean = false;
        public id: string;
        public tokens: number;
        public gamesPlayed: number;
        public gamesWon: number;
        public navBarColor: string = '';
        public backgroundColor: string = '';

        public friends: string = '';

     


        public static GetAnonymousUser(): Models.UserModel {
            let user = new Models.UserModel();
            user.userName = 'Anonymous';
            user.tokens = 500;
            user.gamesPlayed = 0;
            return user;
        }
    }
}