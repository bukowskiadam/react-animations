export default class MessageId {
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
}
