export default class Connection {
    callback;

    onMessage = (callback) => {
        this.callback = callback;
    };

    sendMessage = (message) => {
        if (this.callback) {
            this.callback(message);
        }
    }
}
