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

        this.isComponentMounted = false;
        this.state = {
            data: 0,
            power: false,
        };
        this.props.onMessage(this.onMessage);
    }

    componentDidMount() {
        this.isComponentMounted = true;
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    onClick = () => {
        this.onMessage(this.props.createMessage(0));
    };

    onMessage = (message) => {
        if (this.isComponentMounted) {
            // eslint-disable-next-line consistent-return
            this.setState((prevState) => {
                if (!this.handledMessages.has(message.messageId)) {
                    this.handledMessages.add(message.messageId);
                    message.messageId.received();

                    const clonedMessage = message.cloneWithNewPayload(message.payload + 1);
                    // this.props.broadcastMessage(message);
                    setTimeout(() => this.props.broadcastMessage(clonedMessage), 0);

                    return {
                        data: message.payload,
                        power: !prevState.power,
                    };
                }
            });
        }
    };

    render() {
        const { data, power } = this.state;
        const { size } = this.props;

        return (
            <div
                className={ `Tile ${power ? 'on' : 'off'}` }
                style={ {
                    width: size,
                    paddingBottom: size,
                } }
                onClick={ this.onClick }
            >
                <div>
                    { data }
                </div>
            </div>
        );
    }
}
