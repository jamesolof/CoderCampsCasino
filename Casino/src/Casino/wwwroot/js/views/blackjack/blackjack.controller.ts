namespace Casino.Views.Blackjack {
    export class BlackjackController {

        public get isUserLoggedIn() {
            return this.UserService.isLoggedIn;
        }

        public get user(): Models.UserModel {
            return this.UserService.user;
        }

        public inGame: boolean = false
        public game: Game;
        public tokens: number;
        public bet: number = 0;
        public value: number = 0;
        public canv: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
        public ctx = this.canv.getContext("2d");



        static $inject = [
            'PlayerService',
            'UserService'
        ];

        constructor(
            private PlayerService: Services.PlayerService,
            private UserService: Services.UserService
        ) {
            this.game = new Game(this.canv);
            this.ctx.font = "30px Comic Sans MS";
            this.ctx.textAlign = 'center';

        }

        public updateUser(user: Models.UserModel, tokens: number) {
            this.PlayerService.updateTokens(user, tokens);
        }

        public placeBet(b: number) {
            if (b <= this.user.tokens) {
                this.ctx.font = "30px Comic Sans MS";
                this.bet += b;
                this.updateUser(this.user, -b)
                console.log(`${b},${this.bet}`);
                this.ctx.fillStyle = "#095807";
                this.ctx.fillRect(152, 269, 150, 75);
                this.ctx.fillStyle = "#000";
                this.ctx.fillText("your bet", 200, 269);
                this.ctx.fillStyle = "#e5c100";
                this.ctx.fillText(`${this.bet}`, 200, 309);
            }
            else {
                console.log("account is emptyss")
            }

        }

        public clearBets() {
            this.ctx.font = "30px Comic Sans MS";
            this.updateUser(this.user, this.bet)
            this.bet = 0;
            this.ctx.fillStyle = "#095807";
            this.ctx.fillRect(152, 269, 150, 75);
            this.ctx.fillStyle = "#000";
            this.ctx.fillText("your bet", 200, 269);
            this.ctx.fillStyle = "#e5c100";
            this.ctx.fillText(`0`, 200, 309);
        }

        public clickHit() {
            console.log("hit");

            this.game.hitMe();
            this.game.drawHand(this.game.playerHand, 350);
            this.value = this.game.gameStatus(true);
            if (this.value != 100) {
                this.updateUser(this.user, this.value * this.bet)
                this.inGame = false;
                this.clearBets();
                this.PlayerService.updateGamesPlayed(this.user);
            }
        }

        public clickStay() {
            this.PlayerService.updateGamesPlayed(this.user);

            while (this.game.dealerTotal < 17) {
                this.game.holdMe();
                this.game.drawHand(this.game.dealerHand, 83);
            }
            this.value = this.game.gameStatus(false);
            if (this.value != 100) {
                this.updateUser(this.user, this.value * this.bet)
                this.inGame = false;
                this.clearBets();
                if ((this.value == 1) || (this.value == 2)) {
                    this.PlayerService.updateGamesWon(this.user);
                }
            }
        }

        public runGame(
        ) {

            this.inGame = true;

            this.game = new Game(<HTMLCanvasElement>document.getElementById('myCanvas'));

            var canv = <HTMLCanvasElement>document.getElementById('myCanvas');
            let game = this.game;
            let value: number = 0;

            //get canvas

            var ctx = canv.getContext("2d");

            ctx.clearRect(265, 0, 1000, 1000)
            //get the image

            game.drawHand(game.dealerHand, 83);
            let dealerc1 = new Image();
            dealerc1.src = '../../../img/cardback.png';
            ctx.drawImage(dealerc1, 0, 0, 92, 138, 448, 83, 92, 138)


            game.drawHand(game.playerHand, 350);

            this.value = this.game.gameStatus(true);

            if (this.value == 2) {
                this.updateUser(this.user, this.value * this.bet)
                this.inGame = false;
                this.clearBets();
            }
        };
    }
}
