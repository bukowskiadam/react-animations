import Connection from './Connection';

export default class SquareBoard {
    constructor(size) {
        this.size = size;
        this.elements = [];
        this.initBoard();
    }

    initBoard = () => {
        for (let y = 0; y < this.size; y += 1) {
            this.elements[y] = [];
            for (let x = 0; x < this.size; x += 1) {
                const identifier = `row:${y};col:${x}`;
                const connection = new Connection();
                const broadcaster = this.createBroadcaster(x, y);

                this.elements[y][x] = {
                    identifier,
                    connection,
                    broadcaster,
                };
            }
        }
    };

    createBroadcaster = (x, y) => (message) => {
        if (x + 1 < this.size) this.elements[y][x + 1].connection.sendMessage(message);
        if (y + 1 < this.size) this.elements[y + 1][x].connection.sendMessage(message);
        if (x - 1 >= 0) this.elements[y][x - 1].connection.sendMessage(message);
        if (y - 1 >= 0) this.elements[y - 1][x].connection.sendMessage(message);
    };

    generate = (componentCreator) => {
        const components = [];

        for (let y = 0; y < this.size; y += 1) {
            for (let x = 0; x < this.size; x += 1) {
                const {
                    identifier,
                    connection,
                    broadcaster,
                } = this.elements[y][x];

                components.push(
                    componentCreator(
                        identifier,
                        connection.onMessage,
                        broadcaster,
                    ),
                );
            }
        }

        return components;
    }
}
