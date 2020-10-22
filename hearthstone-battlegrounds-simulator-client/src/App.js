import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Board from './Components/Board/Board';
import MinionPool from './Components/MinionPool/MinionPool';
import store from './store';
import './App.css';

class App extends Component {

    render() {
        return (
            <Router>
                <Provider store={store}>
                    <div className='application-wrapper'>
                        <Header />
                        <Route exact path='/'>
                            <Board />
                        </Route>
                        <Route exact path='/minionPool'>
                            <MinionPool />
                        </Route>
                    </div>
                </Provider>
            </Router>
        );
    }
}

export default App;