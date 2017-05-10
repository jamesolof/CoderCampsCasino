namespace Casino.Models {

    export class BCard {
        public value: number;

        public c: number;
        public face: boolean = false;
        public ace: boolean = false;

        constructor(randie) {
            this.c = randie;

            if ((randie % 13) <= 9) {
                this.value = (randie % 13)+1;
            }
            if ((randie % 13) <= 12 && (randie % 13) > 9) {
                this.value = 10;
                this.face = true;
            }
            if (randie % 13 == 0)
            {

                this.value = 11;
                this.ace = true;
            }
        }
    }
}