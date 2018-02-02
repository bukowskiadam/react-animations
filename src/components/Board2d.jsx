import React from 'react';
import PropTypes from 'prop-types';

import './Board2d.css';
import Tile from './Tile';
import MessagingBoard from '../messaging/SquareBoard';
import Message from '../messaging/Message';
import performance from '../performance';

export default class Board2d extends React.PureComponent {
    static propTypes = {
        size: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        const { size } = props;

        this.messagingBoard = new MessagingBoard(size);
        this.totalTiles = size * size;

        this.state = {
            animationDuration: -1,
        };
    }

    onMessageCompleted = () => {
        performance.end();
        this.setState({
            animationDuration: performance.getEntries()[0].duration,
        });
        performance.clearEntries();
    };

    onMessageStart = () => {
        performance.start();
    };

    createMessage = () => {
        this.onMessageStart();

        return new Message(this.totalTiles, this.onMessageCompleted);
    };

    renderTiles = () => {
        const { size } = this.props;
        const tileSize = `${(100.0 / size).toFixed(4)}%`;

        const createTile = (identifier, onMessage, broadcastMessage) => (
            <Tile
                key={ identifier }
                size={ tileSize }
                onMessage={ onMessage }
                broadcastMessage={ broadcastMessage }
                createMessage={ this.createMessage }
            />
        );

        return this.messagingBoard.generate(createTile);
    };

    renderPerformance = () => {
        const { animationDuration } = this.state;

        if (animationDuration > 0) {
            return (
                <div>
                    Performance: { animationDuration.toFixed(3) } ms
                </div>
            );
        }

        return null;
    };

    render() {
        return (
            <React.Fragment>
                <div className="Board">
                    { this.renderTiles() }
                </div>
                { this.renderPerformance() }
            </React.Fragment>
        );
    }
}
