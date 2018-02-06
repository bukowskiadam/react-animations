export default class Message {
    constructor(receiversTotal, onComplete) {
        this.receiversTotal = receiversTotal;
        this.receiversCount = 0;
        this.onComplete = onComplete;
        this.valid = true;
    }

    received = () => {
        // eslint-disable-next-line no-plusplus
        if (++this.receiversCount === this.receiversTotal) {
            this.onComplete(this);
        }
    };

    isValid = () => this.valid;

    invalidate = () => {
        this.valid = false;
    };
}
