namespace Casino.Views.Slots {

    export class wheel {
        public bmp: createjs.Bitmap[] = [];
        public nums: number[] = [];
        public rotations: number = 0;
        public speed: number;

        constructor(

            rnum: number,
            speed: number
        ) {
            this.speed = speed;
            for (let i = 0; i <= 6; i++) {
                if (rnum <= 6) {
                    rnum++;
                    this.nums[i] = rnum;
                    this.bmp[i] = new createjs.Bitmap(`../../../img/slot${rnum}.png`);
                    this.bmp[i].scaleX = 1;
                    this.bmp[i].scaleY = 1;


                }
                else {
                    rnum = 1;
                    this.nums[i] = rnum;
                    this.bmp[i] = new createjs.Bitmap(`../../../img/slot${rnum}.png`);
                    this.bmp[i].scaleX = 1;
                    this.bmp[i].scaleY = 1;

                }
            }
        }
    }

    export class SlotsController {

        public get isUserLoggedIn() {
            return this.UserService.isLoggedIn;
        }

        public get user(): Models.UserModel {
            return this.UserService.user;
        }
        public depos: number = 0;
        public randNum(): number {

            return Math.floor(Math.random() * 6) + 1;
        }
        public stage: createjs.Stage = new createjs.Stage("slotCanv");
        public machine: wheel[] = [];
        public playable: boolean = false;
        public gameStatus: createjs.Stage = new createjs.Stage("gameStatus");
        public text = new createjs.Text;
        public textMoney = new createjs.Text;
        public fps: number = 180;
        public gameOn = false;
        public graphics = new createjs.Graphics().beginFill("#008cba").drawRect(0, 0, 100, 100);

        public graphicsa = new createjs.Graphics().beginFill("#000000").drawRect(0, 0, 150, 150);
        public shape = new createjs.Shape();
        public shapea = new createjs.Shape();


        public speeds: number[] = [5, 10, 15];



        static $inject = [
            'PlayerService',
            'UserService'
        ];

        constructor(
            private PlayerService: Services.PlayerService,
            private UserService: Services.UserService
        ) {
            let that = this;
            createjs.Ticker.addEventListener("tick", handleTick);
            function handleTick(event) {
                that.stage.update();
                that.gameStatus.update();
            }
            this.drawBoard();

        }//end ctor

        public playSlots() {
            let that = this;
            this.stage.removeAllChildren();

            // this.stage.update();
            let randy: number[] = []
            randy[0] = this.randNum();
            randy[1] = this.randNum();
            randy[2] = this.randNum();


            for (let i = 0; i <= 2; i++) {
                this.machine[i] = new wheel(randy[i], this.speeds[i]);
            }


            let spins = 0;
            that.gameOn = true;



            for (let j = 0; j <= 5; j++) {

                //console.log(`${this.machine[0].nums[j + 1]}   ${this.machine[1].nums[j + 1]}   ${this.machine[2].nums[j + 1]}`);

                this.stage.addChild(this.machine[0].bmp[j + 1]);
                this.stage.addChild(this.machine[1].bmp[j + 1]);
                this.stage.addChild(this.machine[2].bmp[j + 1]);
                this.machine[0].bmp[j + 1].x = (200 + 300 * 0) - 75;
                this.machine[1].bmp[j + 1].x = (200 + 300 * 1) - 75;
                this.machine[2].bmp[j + 1].x = (200 + 300 * 2) - 75;
                this.machine[0].bmp[j + 1].y = (100 + 200 * j) - 100;
                this.machine[1].bmp[j + 1].y = (100 + 200 * j) - 100;
                this.machine[2].bmp[j + 1].y = (100 + 200 * j) - 100;

                // this.stage.update();

            }

            createjs.Ticker.on("tick", function (e) {
                if (that.machine[0].speed != 0) {
                    for (let n = 0; n < 3; n++) {

                        if (that.machine[n].bmp[1].y == 0) {


                            that.machine[n].rotations++;
                            //console.log(that.machine[n].rotations);
                        }

                        if (that.machine[n].rotations == 10) {
                            that.machine[n].speed = 0;
                        }

                        for (let i = 1; i <= 6; i++) {
                            // console.log(that.machine[0].bmp[1].y);

                            if (that.machine[n].bmp[i].y > 1133) {
                                that.machine[n].bmp[i].y = -120;
                            }
                            else {
                                that.machine[n].bmp[i].y += that.machine[n].speed;
                            }
                            that.machine[n].bmp[i].scaleX = (1 - (Math.abs(303 - Math.abs((that.machine[n].bmp[i].y) + 120)) / 909));
                            that.machine[n].bmp[i].scaleY = (1 - (Math.abs(303 - Math.abs((that.machine[n].bmp[i].y) + 120)) / 909));

                            //create diagonal effect on spin machine 1
                            if (n == 0) {
                                that.machine[n].bmp[i].x = 175 - 200 * (.4 - (Math.abs(303 - Math.abs((that.machine[n].bmp[i].y) + 120)) / 909));

                            }
                            //create diagonal effect on spin machine 3
                            if (n == 2) {
                                that.machine[n].bmp[i].x = 725 + 150 * (.4 - (Math.abs(303 - Math.abs((that.machine[n].bmp[i].y) + 120)) / 909));

                            }

                        }
                        that.stage.update();
                        createjs.Ticker.setFPS(that.fps);

                    }

                }
                else {
                    createjs.Ticker.removeAllEventListeners();
                    that.gameOn = false;
                    
                    that.drawBoard();
                }

            });


            this.winLogic();
        }


        public winLogic() {
            let win = false;
            // horizontal win
            for (let i = 0; i <= 2; i++) {
                if (this.machine[0].nums[i + 1] == this.machine[1].nums[i + 1]
                    && this.machine[0].nums[i + 1] == this.machine[2].nums[i + 1]) {
                    win = true;
                    this.depos += 25;
                }
            }
            //diamond win
            if (this.machine[0].nums[1] == this.machine[1].nums[2]
                && this.machine[0].nums[1] == this.machine[2].nums[1]) {
                win = true

            }
            if (this.machine[0].nums[3] == this.machine[1].nums[2]
                && this.machine[0].nums[3] == this.machine[2].nums[3]) {
                win = true
            }
            // diagonal win
            if (this.machine[0].nums[1] == this.machine[1].nums[2]
                && this.machine[0].nums[1] == this.machine[2].nums[3]) {
                win = true
                this.depos += 10;
            }
            if (this.machine[0].nums[3] == this.machine[1].nums[2]
                && this.machine[0].nums[3] == this.machine[2].nums[1]) {
                win = true
                this.depos += 10;
            }
            //jackpot
            if (this.machine[0].nums[1] == this.machine[1].nums[1]
                && this.machine[0].nums[1] == this.machine[2].nums[1]
                && this.machine[0].nums[2] == this.machine[1].nums[2]
                && this.machine[0].nums[2] == this.machine[2].nums[2]
                && this.machine[0].nums[3] == this.machine[1].nums[3]
                && this.machine[0].nums[3] == this.machine[2].nums[3]) {

                this.depos += 1000;
            }

            if (!win) {
                var graphics3 = new createjs.Graphics().beginFill("#008cba").drawRect(300, 0, 100, 100);
                let shape3 = new createjs.Shape(graphics3);
                shape3.graphics.beginFill("#008cba").drawRect(300, 0, 250, 100);
                this.gameStatus.addChild(shape3);

                if (this.isUserLoggedIn) {
                    this.depos -= 5;
                    this.PlayerService.updateGamesPlayed(this.user);

                }

                this.text = new createjs.Text("Loss", "20px Arial", "#ffffff")
                this.text.x = 400;
                this.text.y = 30;
                this.text.scaleX = 1;
                this.text.scaleY = 1;
                this.text.textBaseline = "alphabetic";

                this.text.visible = false;
                this.gameStatus.addChild(this.text);

            } else {
                var graphics3 = new createjs.Graphics().beginFill("#008cba").drawRect(300, 0, 100, 100);
                let shape3 = new createjs.Shape(graphics3);
                shape3.graphics.beginFill("#008cba").drawRect(300, 0, 250, 100);
                this.gameStatus.addChild(shape3);
                this.text = new createjs.Text("Winner", "20px Arial", "#ffffff")
                this.text.x = 400;
                this.text.y = 30;
                this.text.scaleX = 1;
                this.text.scaleY = 1;
                this.text.textBaseline = "alphabetic";
                this.text.visible = false;
                this.gameStatus.addChild(this.text);

                if (this.isUserLoggedIn) {
                    this.PlayerService.updateGamesPlayed(this.user);
                    this.PlayerService.updateGamesWon(this.user);
                    this.depos += 5;

                }
            }
        }

        public insertMoney(b: number) {
            this.depos += b;
            this.updateUser(this.user, -b);
            this.drawBoard(false);


        }

        public hasMoney() {
            if (this.depos > 0) {
                this.playable = true;
            }
        }

        public cashOut() {
            this.updateUser(this.user, this.depos);
            this.clearDeposit();
            this.drawBoard(false);
        }
        public updateUser(user: Models.UserModel, tokens: number) {
            this.PlayerService.updateTokens(user, tokens);
        }
        public clearDeposit() {
            this.depos = 0;
        }

        public drawBoard(b?: boolean) {
            let that = this;
            that.gameStatus.removeAllChildren;
            this.text.visible = true;


            that.shape = new createjs.Shape(that.graphics);
            that.shapea = new createjs.Shape(that.graphicsa);


            if ((!that.gameOn && that.depos >= 5) || !this.isUserLoggedIn) {
                that.shape.graphics.beginFill("#008cba").drawRect(0, 0, 150, 100);
                that.gameStatus.addChild(that.shape);

                let playText = new createjs.Text(`Play game`, "20px Arial", "#ffffff");
                playText.x = 30;
                playText.y = 30;
                playText.textBaseline = "alphabetic";
                that.gameStatus.addChild(that.shape);
                that.gameStatus.addChild(that.shapea);
                that.gameStatus.addChild(playText);

            }

            if (!b) {
                this.gameStatus.removeChild(this.textMoney)
            }

            var graphics2 = new createjs.Graphics().beginFill("#008cba").drawRect(690, 0, 200, 200);
            let shape2 = new createjs.Shape(graphics2);
            shape2.graphics.beginFill("#008cba").drawRect(690, 0, 200, 200);
            this.textMoney = new createjs.Text(`Bank: $ ${this.depos}`, "20px Arial", "#ffffff");
            this.textMoney.x = 700;
            this.textMoney.y = 30;
            this.textMoney.textBaseline = "alphabetic";


            if (this.isUserLoggedIn) {
                that.gameStatus.addChild(that.textMoney);
            }
            else {
                this.textMoney.text = "Please login to bet."
                this.textMoney.x = 650;
                that.gameStatus.addChild(that.textMoney);
            }

            that.shape.on('mousedown', function (e: createjs.MouseEvent) {
                //that.shape.shadow = new createjs.Shadow("#333333", 10, 10, 10);
             
                that.shape.visible = false;
                that.shapea.visible = true;
                this.fps = 180;
                createjs.Ticker.setFPS(this.fps);
                that.gameStatus.update();
            });

            that.shape.on('pressup', function (e: createjs.MouseEvent) {
                if (!that.gameOn) {
                    that.playSlots();
                    that.gameStatus.update();
                }
            });

            that.shapea.visible = false;
            that.gameStatus.addChild(that.textMoney);
            that.gameStatus.update();

        }

    }//end class
}//end nspace