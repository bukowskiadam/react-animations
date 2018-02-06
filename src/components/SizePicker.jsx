import React from 'react';
import PropTypes from 'prop-types';

import './SizePicker.css';

const SizePicker = ({ onChange, value }) => (
    <div className="sizePicker">
        <label htmlFor="sizePicker">Board size: </label>
        <input
            type="range"
            value={ value }
            min="3"
            max="32"
            onChange={ (event) => {
                const boardSize = parseInt(event.target.value, 10) || 12;
                onChange(boardSize);
            } }
        />
        <span className="valueText">{ value }</span>
    </div>
);

SizePicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

export default SizePicker;
