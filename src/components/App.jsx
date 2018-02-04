import React from 'react';

import './App.css';
import Board2d from './Board2d';
import GithubCorner from './GithubCorner';

const size = 32;

const App = () => (
    <div className="App">
        <header className="AppHeader">
            <h1>React Animations!</h1>
            <GithubCorner url="https://github.com/bukowskiadam/react-animations" color="#222222" fill="#ffffff" />
        </header>
        <div className="AppContainer">
            <h3>Click on board!</h3>
            <Board2d size={ size } />
        </div>
    </div>
);

export default App;
