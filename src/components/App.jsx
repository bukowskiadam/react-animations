import React from 'react';

import './App.css';
import Board2d from './Board2d';
import SizePicker from './SizePicker';
import GithubCorner from './GithubCorner';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boardSize: 16,
        };
    }

    updateBoardSize = (value) => {
        this.setState({
            boardSize: value,
        });
    };

    render() {
        const { boardSize } = this.state;

        return (
            <div className="App">
                <header className="AppHeader">
                    <h1>React Animations!</h1>
                    <GithubCorner
                        url="https://github.com/bukowskiadam/react-animations"
                        color="#222222"
                        fill="#ffffff"
                    />
                </header>
                <div className="AppContainer">
                    <h3>Click on board!</h3>
                    <SizePicker onChange={ this.updateBoardSize } value={ boardSize } />
                    <Board2d size={ boardSize } />
                </div>
            </div>
        );
    }
}

export default App;
