namespace Casino.Views.Roulette {
    export class Game {

        public value: number = 0;
        public bets: Bet[];
        public winBets: Bet[] = [];
        public ctx;
        public pearl: createjs.Bitmap
        public stage: createjs.Stage = new createjs.Stage("wheel");
        public spinning: boolean = false;
        public eventlistener;

        constructor(b: Bet[]) {
            let that = this;
            this.bets = b;
            let x = randNum();
            this.value = x;

            createjs.Ticker.addEventListener("tick", function (e) {
                that.stage.update();
            });


        }

        public drawBall(){
            this.spinning = true;
            let that = this;
            this.stage.removeAllChildren();
            let angle = 0;
            //ball placements enjoy!
            let options: number[] =
                [28, 9, 26, 30, 11, 7, 20, 32, 17, 5,
                    22, 34, 15, 3, 24, 36, 13, 1, 38,
                    27, 10, 25, 29, 12, 8, 19, 31, 18,
                    6, 21, 33, 16, 4, 23, 35, 14, 2, 37];

            let PiTime = ((Math.PI * 2) / options.length);

            options.forEach(function (option, i, options) {
                if (that.value == option) { angle = .05 + (PiTime * (i + 1)) }
            })

            let spins = angle + (4 * Math.PI);
            let spin = 0;
            let spinint = .1


            let Xstart = 245 + (137 * Math.cos(angle));
            let Ystart = 245 + (137 * Math.sin(angle));


            this.pearl = new createjs.Bitmap("../../../img/pearl.png");
            this.pearl.scaleX = .15;
            this.pearl.scaleY = .15;
            this.stage.addChild(this.pearl);



            var listener = createjs.Ticker.on("tick", function (e) {
                console.log("tick")
                if (spin < spins) {
                    Xstart = 245 + (137 * Math.cos(spin));
                    Ystart = 245 + (137 * Math.sin(spin));
                    that.pearl.x = Xstart;
                    that.pearl.y = Ystart;
                    that.stage.update();
                    spin += Math.abs(spinint);
                }
                else {

                    Xstart = 245 + (138 * Math.cos(angle));
                    Ystart = 245 + (138 * Math.sin(angle));

                    that.spinning = false;

                    let text = new createjs.Text(`${that.value}`, "20px Arial", "#000")

                    if ((that.value >= 1 && that.value <= 9) ||
                        (that.value >= 19 && that.value <= 27)) {
                        if (that.value % 2 != 0) {
                            text.color = "#B22222";
                        }
                    }
                    if ((that.value >= 12 && that.value <= 18) ||
                        (that.value >= 30 && that.value <= 36)) {
                        if (that.value % 2 == 0) {
                            text.color = "#B22222";
                        }
                    }

                    if (that.value == 37) {
                        text.color = "#008000";
                        text.text = "0";
                    }

                    if (that.value == 38) {
                        text.color = "#008000";
                        text.text = "00";
                    }

                    if (that.value < 10) {
                        text.x = 225;
                    }
                    else { text.x = 195; }
                    text.y = 280;
                    text.scaleX = 5;
                    text.scaleY = 5;
                    text.textBaseline = "alphabetic";

                    that.stage.addChild(text);
                    that.stage.update();
                    createjs.Ticker.off("tick", listener);

                }
                if (spins - spin <= 2 * Math.PI) {
                    spinint -= .0005
                }

            })

        }


        public betEval(): Bet[] {
            let that = this;
            this.bets.forEach(function (bet, i, bets) {
                if (bet != null) {
                    //str8 up #1-36
                    if (that.value <= 36 && that.value >= 1) {
                        if (bet.id == that.value) {
                            that.winBets.push(bet);
                        }
                    }
                    //zero green square
                    if (bet.id == 37 && that.value == 48) {
                        that.winBets.push(bet);
                    }
                    //dubzero green square
                    if (bet.id == 38 && that.value == 49) {
                        that.winBets.push(bet);
                    }

                    //value 1- 18
                    if (bet.id == 50) {
                        if (that.value >= 1 && that.value <= 18) {
                            that.winBets.push(bet)
                        }
                    }
                    //value 19-36
                    if (bet.id == 40) {
                        if (that.value >= 19 && that.value <= 36) {
                            that.winBets.push(bet)
                        }
                    }
                    //evens
                    if (bet.id == 41) {
                        if (that.value % 2 == 0) {
                            that.winBets.push(bet)
                        }
                    }
                    //odds
                    if (bet.id == 42) {
                        if (that.value % 2 != 0) {
                            that.winBets.push(bet)
                        }
                    }
                    //red
                    if (bet.id == 43) {
                        if ((that.value >= 1 && that.value <= 9) ||
                            (that.value >= 19 && that.value <= 27)) {
                            if (that.value % 2 != 0) {
                                that.winBets.push(bet)
                            }
                        }
                        if ((that.value >= 12 && that.value <= 18) ||
                            (that.value >= 30 && that.value <= 36)) {
                            if (that.value % 2 == 0) {
                                that.winBets.push(bet)
                            }
                        }
                    }
                    //black
                    if (bet.id == 44) {
                        //for 1-10 or 19-28
                        if (that.value >= 1 && that.value <= 10
                            || that.value >= 19 && that.value <= 28) {
                            //evens are black
                            if (that.value % 2 == 0) {
                                that.winBets.push(bet);
                            }

                        }
                        //for 11-17 or 29-35
                        if (that.value >= 11 && that.value <= 17
                            || that.value >= 29 && that.value <= 35) {
                            //odd are black
                            if (that.value % 2 != 0) {
                                that.winBets.push(bet);
                            }

                        }
                    }
                    //dozens, 1-12
                    if (bet.id == 45) {
                        if (that.value >= 1 && that.value <= 12) {
                            that.winBets.push(bet)
                        }
                    }
                    //dozens 13-24
                    if (bet.id == 46) {
                        if (that.value >= 13 && that.value <= 24) {
                            that.winBets.push(bet)
                        }
                    }
                    //dozens 25-36
                    if (bet.id == 47) {
                        if (that.value >= 25 && that.value <= 36) {
                            that.winBets.push(bet)
                        }
                    }
                    //top row
                    if (bet.id == 39) {
                        if (that.value % 3 == 0) {
                            that.winBets.push(bet)
                        }
                    }
                    //middle row
                    if (bet.id == 38) {
                        if (that.value % 3 == 2) {
                            that.winBets.push(bet)
                        }
                    }
                    //bottom row
                    if (bet.id == 37) {
                        if (that.value % 3 == 1) {
                            that.winBets.push(bet)
                        }
                    }
                }

            });
            return that.winBets;
        }
    }



    //38 slots + 0/ 00
    export function randNum() {
        return Math.floor(Math.random() * 38) + 1;
    }

    export class Bet {
        public id: number;
        public value: number;
        public mult: number;
        public bmp: createjs.Bitmap;
        public bmpId: number

        constructor(
            id: number,
            value: number,
            //img: string,
            imgNum: number
        ) {
            this.id = id;
            this.bmpId = imgNum;
            this.value = value;
            //str8 up bet
            if (this.id < 39) {
                this.mult = 35;
            }
            //1 to 1 bets
            if (this.id >= 39 && this.id <= 44) {
                this.mult = 1;
            }
            //2 to 1 bets
            if (this.id >= 45 && this.id <= 50) {
                this.mult = 2;
            }
        }

    }

}
