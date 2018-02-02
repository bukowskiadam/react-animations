/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import './Tile.css';

export default class Tile extends React.PureComponent {
    static propTypes = {
        size: PropTypes.string.isRequired,
        onMessage: PropTypes.func.isRequired,
        broadcastMessage: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.handledMessages = new WeakSet();

        this.state = {
            power: false,
        };
        this.props.onMessage(this.onMessage);
    }

    onClick = () => {
        this.onMessage(this.props.createMessage());
    };

    onMessage = (message) => {
        // eslint-disable-next-line consistent-return
        this.setState((prevState) => {
            if (!this.handledMessages.has(message)) {
                this.handledMessages.add(message);
                message.received();

                // this.props.broadcastMessage(message);
                setTimeout(() => this.props.broadcastMessage(message), 0);

                return {
                    power: !prevState.power,
                };
            }
        });
    };

    render() {
        const { size } = this.props;

        return (
            <div
                className={ `Tile ${this.state.power ? 'on' : 'off'}` }
                style={ {
                    width: size,
                    paddingBottom: size,
                } }
                onClick={ this.onClick }
            />
        );
    }
}
