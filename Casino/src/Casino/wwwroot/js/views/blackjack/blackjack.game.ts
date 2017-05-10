namespace Casino.Views.Blackjack {
    export class Game {
        public ctx;

        public img = new Image()
        public dealerc1 = new Image();


        public playerTotal = 0;
        public dealerTotal = 0;

        public bj = false;
        public win = false;
        public lose = false;
        public tie = false;

        public playerHand: Models.BCard[] =
        [null, null, null, null, null, null, null, null, null, null, null];
        public dealerHand: Models.BCard[] =
        [null, null, null, null, null, null, null, null, null, null, null];
        public pindex = 2;
        public dindex = 2;

        constructor(canv: HTMLCanvasElement) {
            this.img.src = '../../../img/cards.png';
            this.dealerc1.src = '../../../img/cardback.png';


            this.ctx = canv.getContext("2d");

            this.dealerHand[0] = new Models.BCard(this.randyo());
            this.dealerHand[1] = new Models.BCard(this.randyo());

            this.playerHand[0] = new Models.BCard(this.randyo());
            this.playerHand[1] = new Models.BCard(this.randyo());

            this.dealerTotal = this.dealerHand[0].value + this.dealerHand[1].value;
            this.playerTotal = this.playerHand[0].value + this.playerHand[1].value;
        }

        public holdMe() {
            this.dealerHand[this.dindex] = new Models.BCard(this.randyo());
            this.dealerTotal += this.dealerHand[this.dindex].value;
            this.dindex++;
        }

        public hitMe() {

            this.playerHand[this.pindex] = new Models.BCard(this.randyo());
            this.playerTotal += this.playerHand[this.pindex].value;
            this.pindex++;
        }
        //this method is called after every move, to see if the game will continue
        public gameStatus(player: boolean): number {
            //player bool is passed as true if the player hits, false if he stays
            let bj = false;
            let pt = this.playerTotal;
            let dt = this.dealerTotal;

            // Create gradient for the text
            this.ctx.font = "40px Comic Sans MS";
            var gradient = this.ctx.createLinearGradient(292, 0, 600, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            this.ctx.textAlign = 'center';

            //result for player blackjack.
            if (pt == 21 && this.playerHand[2] == null) {
                this.ctx.fillStyle = "#095807";
                this.ctx.fillRect(337, 225, 600, 120)
                this.ctx.fillStyle = gradient;
                this.ctx.fillText("Blackjack!!!", 550, 290);
                bj = true;
                this.bj = true;

            }
            //player bust result... see dealer result below for explanation
            if (pt > 21) {
                let aceu = false;
                for (var i = 0; i < 11; i++) {
                    if (this.playerHand[i] != null && !aceu) {
                        if (this.playerHand[i].value != 1) {
                            if (this.playerHand[i].ace) {
                                this.playerHand[i].value = 1;
                                this.playerTotal -= 10;
                                pt -= 10;
                                aceu = true;
                            }
                        }
                    }

                }
                if (pt > 21) {
                    this.ctx.fillStyle = "#095807";
                    this.ctx.fillRect(337, 225, 600, 120)
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillText("FAIL!! You Busted", 550, 290);
                    this.lose = true;
                }
            }
            //result for dealer bust
            if (dt > 21) {
                //if u bust with an ace, ace value drops from 11 to 1, then u dont bust
                let aceu = false;
                for (var i = 0; i < 11; i++) {
                    if (this.dealerHand[i] != null && !aceu) {
                        if (this.dealerHand[i].ace) {
                            if (this.dealerHand[i].value != 1) {
                                this.dealerHand[i].value = 1;
                                this.dealerTotal -= 10;
                                dt -= 10;
                                aceu = true;
                            }

                        }
                    }
                }
                //run result if there isnt an ace in the hand
                if (dt > 21) {
                    this.ctx.fillStyle = "#095807";
                    this.ctx.fillRect(337, 225, 600, 120)
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillText("Dealer busts.. You Win!", 550, 290);
                    this.win = true;
                }
            }
            //these results only run if player hits stand...
            if (!player) {
                //result for dealer blackjack
                if (dt == 21 && this.dealerHand[2] == null) {
                    this.ctx.fillStyle = "#095807";
                    this.ctx.fillRect(337, 225, 600, 120)
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillText("Dealer got Blackjack :(", 550, 290);
                    this.lose = true;

                }
                //result for dealer standard win
                if (dt > pt && dt <= 21 && !bj) {
                    this.ctx.fillStyle = "#095807";
                    this.ctx.fillRect(337, 225, 600, 120)
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillText("Dealer Wins", 550, 290);
                    this.lose = true;
                }
                //result for player standard win
                if (pt > dt && pt <= 21 && !bj) {
                    this.ctx.fillStyle = "#095807";
                    this.ctx.fillRect(337, 225, 600, 120)
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillText("Player Wins!!", 550, 290);
                    this.win = true;

                }
                //result for a tie
                if (dt == pt) {
                    this.ctx.fillStyle = "#095807";
                    this.ctx.fillRect(337, 225, 600, 120)
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillText("It's a Draw", 550, 290);
                    this.tie = true;
                }
                this.drawHand(this.dealerHand, 83)
            }

            if (this.win) {
                return 1;
            }
            else if (this.lose) {
                return -1;
            }
            else if (bj) {
                return 2;
            }
            else if (this.tie) {
                return 0;
            }
            else if (!this.bj && !this.win && !this.lose && !this.tie) {
                return 100;
            }
        };


        public randyo() {
            return (Math.floor(Math.random() * 51) + 1);
        }


        public drawHand(cards: Models.BCard[], hand: number) {
            let that = this;
            //this clears the old hand away
            if (hand == 83) { that.ctx.clearRect(0, 83, 1100, 138) };
            if (hand == 350) { that.ctx.clearRect(0, 350, 1100, 138) };
            //gets number of cards in handd
            let numCards = 0
            for (let n of cards) {
                if (n != null) { numCards++ }
            }
            //variable for where to start drawing cards
            let xInit = (550 - (.5 * (numCards * 92 + numCards * 10)))
            numCards = 0
            //loop thru hand, draw each card
            cards.forEach(function (card, i, cards) {
                if (card != null) {
                    let c = card.c;
                    let sx = (c % 5) * 92;
                    let sy = Math.floor(c / 5) * 138;
                    let sw = 92;
                    let sh = 138;
                    that.ctx.drawImage(that.img, sx, sy, sw, sh, xInit + 102 * i, hand, 92, 138)
                }
            });
        }
    }


}
