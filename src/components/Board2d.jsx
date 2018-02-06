import React from 'react';
import PropTypes from 'prop-types';

import './Board2d.css';
import Tile from './Tile';
import MessagingBoard from '../messaging/SquareBoard';
import performance from '../performance';

export default class Board2d extends React.PureComponent {
    static propTypes = {
        size: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.messagingBoard = null;

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

    onMessageCreated = () => {
        performance.start();
    };

    getMessagingBoard = () => {
        const { size } = this.props;

        if (!this.messagingBoard || this.messagingBoard.size !== size) {
            this.messagingBoard = new MessagingBoard(
                size,
                this.onMessageCreated,
                this.onMessageCompleted,
            );
        }

        return this.messagingBoard;
    };

    renderTiles = () => {
        const { size } = this.props;
        const tileSize = `${(100.0 / size).toFixed(4)}%`;

        const createTile = (identifier, onMessage, createMessage, broadcastMessage) => (
            <Tile
                key={ identifier }
                size={ tileSize }
                onMessage={ onMessage }
                broadcastMessage={ broadcastMessage }
                createMessage={ createMessage }
            />
        );

        return this.getMessagingBoard().generate(createTile);
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
