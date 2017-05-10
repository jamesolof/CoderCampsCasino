namespace Casino.Views.Friends {
    export class FriendsController {


        public Appuser: Models.UserModel;

        public userFriends: Models.friendModel[] = [];

        public possiblefriends: Models.friendModel[];

        public friendSearch: string = "";

        public get user(): Models.UserModel {
            return this.UserService.user;
        }
        public get isUserLoggedIn() {
            return this.UserService.isLoggedIn;
        }


        static $inject = [
            'UserService',
            'PlayerService'
        ];

        constructor(
            private UserService: Services.UserService,
            private PlayerService: Services.PlayerService,

        ) {

            //UserService.getAllUsers();


            this.Appuser = this.UserService.authUser

            //console.log(this.Appuser)

            //this.populateList();

            //console.log(this.UserService.availableFriends)

            this.getUsers();

        }

        public getUsers(): Promise<void> {
            return this.UserService.getAllUsers()
                .then((response) => {
                    this.populateList();
                    return console.log("ok")
                })
                .catch(() => {
                    this.populateList();
                    return console.log("notOk");
                });
        }



        public addfriend() {

            let that = this;
            let copy = false;
            let b = -1

            this.UserService.availableFriends.forEach(function (friend, i, friends) {
                if (that.friendSearch == friend.nickname) {
                    b = i;
                }
            })
            if (b != -1) {
                this.userFriends.forEach(function (friend, i, friends) {
                    if (that.UserService.availableFriends[b] == friend) {
                        copy = true
                    }
                })
                if (copy == false) {
                    this.userFriends.push(that.UserService.availableFriends[b]);
                    this.PlayerService.addFriend(this.Appuser, this.UserService.availableFriends[b])
                }
            }
            if (b == -1) {
                console.log("does not exist")
            }
        }

        public removeFriend(friend: Models.friendModel) {
            this.PlayerService.removeFriend(this.Appuser, friend);
        }

        public populateList() {
            let that = this;
            if (this.Appuser.friends != "") {
                let fr = this.Appuser.friends.split(',');
                fr.forEach(function (friendName, i, fr) {
                    that.UserService.availableFriends.forEach(function (possiblefriend, n, possiblefriends) {
                        if (friendName == possiblefriend.nickname) {
                            that.userFriends.push(possiblefriend);
                        }
                    })
                })
            }
            else { console.log("friends list is empty") }

        }
    }
}