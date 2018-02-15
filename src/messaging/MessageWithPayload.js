export default class MessageWithPayload {
    constructor(messageId, payload) {
        this.messageId = messageId;
        this.payload = payload;
    }

    cloneWithNewPayload = newPayload => new MessageWithPayload(this.messageId, newPayload);
}
