import React from 'react';

import './App.css';
import Board2d from './Board2d';

const size = 32;

const App = () => (
    <div className="App">
        <header className="AppHeader">
            <h1>React Animations!</h1>
        </header>
        <div className="AppContainer">
            <h3>Click on board!</h3>
            <Board2d size={ size } />
        </div>
    </div>
);

export default App;
