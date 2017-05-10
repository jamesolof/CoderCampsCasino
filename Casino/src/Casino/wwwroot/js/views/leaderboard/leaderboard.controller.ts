namespace Casino.Views.LeaderBoard {
    export class LeaderBoardController {

        public userScore: Models.UserModel[];
        public highScore: Models.UserModel [] = [];

        static $inject = [
            'PlayerService',
            'UserService'
        ];

        constructor(
             private PlayerService: Services.PlayerService,
            private UserService: Services.UserService
        ) {
            
            PlayerService.getUserScores().then((result) => {
                this.userScore = result;
                this.highScore = this.sortTokens();

             
            }).catch((err) => {
                console.log(err);
                });


        }//end constructor

        public sortTokens(): Models.UserModel[] {
      
            this.userScore.sort(function (a, b) {
                return b.tokens - a.tokens;
            });
            
            
                for (let i = 0; i < this.userScore.length; i++) {
                    this.highScore[i] = this.userScore[i];
                
            }
           
      
            console.log(this.highScore);
            return this.highScore;

        } // end sort tokens


    } // end class
}//end namespace