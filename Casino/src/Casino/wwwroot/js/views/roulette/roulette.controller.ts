namespace Casino.Views.Roulette {
    export class RouletteController {

        public game: Casino.Views.Roulette.Game;
        public bets: Bet[] = [];
        public tempValue: number = 5;
        public vnumber: number;
        public bitmapLoader: createjs.Bitmap;
        public stage: createjs.Stage = new createjs.Stage("board");
        public Appuser: Models.UserModel;
        public chips: createjs.Bitmap[] = []
        public button: createjs.Bitmap[] = [];
        public cash: number = 0;
        public spinning = false;
       

        public get user(): Models.UserModel {
            return this.UserService.user;
        }
        public get isUserLoggedIn() {
            return this.UserService.isLoggedIn;
        }


        static $inject = [
            'UserService',
            'PlayerService',
        ];

        constructor(
            private UserService: Services.UserService,
            private PlayerService: Services.PlayerService,

        ) {
            this.Appuser = this.UserService.authUser
            let that = this;
            this.game = new Game([])

            this.button[0] = new createjs.Bitmap('../../../img/clearbets0.png')
            this.button[1] = new createjs.Bitmap('../../../img/clearbets1.png')
            this.button[2] = new createjs.Bitmap('../../../img/playgame0.png')
            this.button[3] = new createjs.Bitmap('../../../img/playgame1.png')

            for (let i = 0; i <= 2; i += 2) {
                this.button[i].on("mousedown", function (evt: createjs.MouseEvent) {
                    that.stage.update();
                    that.button[i].visible = false;
                    that.button[i + 1].visible = true;
                    if (i == 0) { that.clearBets(true); }
                    else { that.playRou(); }
                    that.stage.update();

                });
                this.button[i].on("pressup", function (evt: createjs.MouseEvent) {
                    that.button[i].visible = true;
                    that.button[i + 1].visible = false;
                    that.stage.update();
                });
            }


            this.setBoard();

            createjs.Ticker.framerate = 60;

            createjs.Ticker.addEventListener("tick", function (e) {
                if (!that.game.spinning) {
                    that.stage.update();
                    if (that.spinning == true) {
                        that.winDisplay(that.cash);
                        that.spinning = false;
                    }
                }

                if (that.game.spinning && !that.spinning) {
                    that.spinning = true;
                }

              

            });

            this.stage.on("pressmove", function (evt: createjs.MouseEvent) {
                if (!(evt.localX >= 550 && evt.localX <= 650)
                    && !(evt.localY >= 422 && evt.localY <= 472)) {
                    evt.target.x = evt.stageX - 23.1;
                    evt.target.y = evt.stageY - 22.9;
                    that.stage.update()
                }

            });
            this.stage.on("pressup", function (evt: createjs.MouseEvent) {

                if (that.button[0].isVisible()) {
                    that.valueFinder(evt.target.image.id);
                    that.clicker(evt);
                }

                that.stage.update();
            })
        }
        public updateUser(tokens: number) {
            this.PlayerService.updateTokens(this.Appuser, tokens);
        }


        public playRou() {
            this.PlayerService.updateGamesPlayed(this.user);
            let that = this;
            this.game = new Game(this.bets);
            this.game.drawBall();
            that.cash = 0;

            let winBets: Bet[] = this.game.betEval();

            if (winBets.length != 0) {
                this.PlayerService.updateGamesWon(this.user);
                winBets.forEach(function (bet, i, winbets) {
                    that.cash += bet.value * bet.mult
                })
            }

            winBets.forEach(function (bet, i, bets) {
                that.updateUser((bet.value * bet.mult) + bet.value);
            });




        }

        public placeBet(id, Xc, Yc, bmp) {

            let replace = false
            let l = this.bets.length;
            this.bets.forEach(function (bet, i, bets) {
                if (bet.bmpId == bmp.id) {
                    bet.id = id;
                    replace = true;
                }
            })
            if (!replace) {
                if (this.Appuser.tokens >= this.tempValue) {
                    this.bets[l] = new Bet(id, this.tempValue, bmp.id);
                    this.updateUser(-this.tempValue);

                    let m = this.chips.length;
                    this.chips.push(new createjs.Bitmap(`../../../img/${bmp.image.id}.png`));
                    this.chips[m].image.id = bmp.image.id;
                    this.chips[m].scaleX = .1;
                    this.chips[m].scaleY = .1;
                    this.stage.addChild(this.chips[m]);
                    this.chips[m].y = 420;
                    this.chips[m].x = 59 + (100 * this.vnumber)
                    this.stage.update();
                }
                else { console.log("you has no monies") }
            }
        }

        public setBoard() {
            let that = this;

            this.chips = []
            this.chips[0] = new createjs.Bitmap('../../../img/chip5.png')
            this.chips[0].image.id = "chip5";
            this.chips[1] = new createjs.Bitmap('../../../img/chip50.png')
            this.chips[1].image.id = "chip50";
            this.chips[2] = new createjs.Bitmap('../../../img/chip100.png')
            this.chips[2].image.id = "chip100";
            this.chips[3] = new createjs.Bitmap('../../../img/chip500.png')
            this.chips[3].image.id = "chip500";

            this.chips.forEach(function (chip, i, chips) {
                chip.scaleX = .1;
                chip.scaleY = .1;
                that.stage.addChild(chip)
                chip.x = 59 + (100 * (i + 1));
                chip.y = 420;
            })

            for (let i = 0; i <= 3; i++) {
                that.stage.addChild(this.button[i]);
                if (i < 2) { this.button[i].x = 550; }
                else { this.button[i].x = 50; }
                this.button[i].y = 422;
            }
            this.button[1].visible = false;
            this.button[3].visible = false
            this.stage.update();
        }

        public winDisplay(cash: number) {


            let that = this;


            let shape = new createjs.Shape();
            shape.graphics.beginFill("#195813").drawRect(20, 20, 660, 460);
            this.stage.addChild(shape);

            if (!that.isUserLoggedIn) {
                let text3 = new createjs.Text(`Log in to place a bet`, "20px Arial", "#000")
                text3.y = 150;
                text3.x = 100
                text3.scaleX = 2;
                text3.scaleY = 2;
                text3.textBaseline = "alphabetic";
                if (cash != 0) {
                    text3.text = "if you had logged in"
                }

                this.stage.addChild(text3);
            }
            
            let text2 = new createjs.Text(`Click here to play again`, "20px Arial", "#000")
            text2.y = 250;
            text2.x = 100
            text2.scaleX = 2;
            text2.scaleY = 2;
            text2.textBaseline = "alphabetic";

            this.stage.addChild(text2);

            if (this.bets.length > 0) {

                let text = new createjs.Text(`You Won ${cash} Tokens :)`, "20px Arial", "#000")
                if (cash == 0) { text.text = "Sorry, but you lost :(" }
                text.y = 200;
                text.x = 150
                text.scaleX = 2;
                text.scaleY = 2;
                text.textBaseline = "alphabetic";
                if (!that.isUserLoggedIn && cash != 0) {
                    text.x = 110;
                    text.text = `You would have Won ${cash} Tokens`;
                }
                this.stage.addChild(text);
            }

            shape.on("click", function (e) {
                that.clearBets(false);
            })

        }

        //function called in 2 locations
        // A. when the user clicks clear bets
        // B. after the game runs
        public clearBets(zoo: boolean) {
            if (zoo) {
                let r = 0
                this.bets.forEach(function (bet, i, bets) { r += bet.value })
                this.updateUser(r)
            }
            this.stage.removeAllChildren();
            this.setBoard();
            this.stage.update();
            this.bets = [];

        }

        public valueFinder(chipId: string) {
            if (chipId == "chip5") { this.tempValue = 5; this.vnumber = 1 }
            if (chipId == "chip50") { this.tempValue = 50; this.vnumber = 2 }
            if (chipId == "chip100") { this.tempValue = 100; this.vnumber = 3 }
            if (chipId == "chip500") { this.tempValue = 500; this.vnumber = 4 }
        }

        //this function gets the mouse coordinates on the stage,
        //and turns them into usable information regarding the bet
        //information is returned to this.placeBet()
        public clicker(e: createjs.MouseEvent) {
            let id = -1;
            let Xc = 0;
            let Yc = 0;
            let xnum = (e.localX - 30) / 43.6;//localized x 0
            let ynum = (e.localY - 61) / 53.3;//localized y 0
            //setting the bounds of where u can bet
            if ((xnum > 1 && xnum < 13) && (ynum > 0 && ynum < 6) ||
                (xnum > 0 && xnum < 14) && (ynum > 1 && ynum < 4)) {
                if (ynum < 1 && ynum > 0) {
                    id = 50 - 10 * Math.floor((xnum - 1) / 6) //50, 40
                }
                else if (xnum < 1 && xnum > 0) {
                    id = 49 - Math.floor((ynum - 1) / 1.5) //49-48
                }
                else if (ynum > 4 && ynum < 5) {
                    id = 45 + Math.floor((xnum - 1) / 4) // 45, 46, 47
                }
                else if (ynum > 5 && ynum < 6) {
                    //1-4even, 10-13odd
                    if (xnum / 4 < 1) { id = 41 }//even41
                    if (xnum / 10 > 1) { id = 42 } //odd42
                    //4-7red43, 7-10blk44
                    if (xnum > 4 && xnum < 10) {
                        id = 43 + (Math.floor(xnum / 7))
                    }
                }
                for (var i = 1; i < 14; i++) {
                    if (xnum > i && xnum < i + 1) {
                        for (var n = 1; n < 4; n++) {
                            if (ynum > n && ynum < n + 1)//1-39
                            {
                                id = 3 * i + 1 - n;
                            }
                        }
                    }

                }
                Xc = Math.floor(e.localX) + .5
                Yc = Math.floor(e.localY) + .5
                this.placeBet(id, Xc, Yc, e.target);
            }
        }
    }//end controller
}//end namespace