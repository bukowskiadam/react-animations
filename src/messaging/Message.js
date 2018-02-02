export default class Message {
    constructor(receiversTotal, onComplete) {
        this.receiversTotal = receiversTotal;
        this.receiversCount = 0;
        this.onComplete = onComplete;
    }

    received = () => {
        // eslint-disable-next-line no-plusplus
        if (++this.receiversCount === this.receiversTotal) {
            this.onComplete();
        }
    }
}
