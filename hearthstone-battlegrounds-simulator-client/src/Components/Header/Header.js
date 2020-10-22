import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {

    render() {
        return (
            <header className="header">
                Hearthstone Battlegrounds Simulator
                <br />
                <Link style={linkStyle} to="/">Battlegrounds Field | </Link>
                <Link style={linkStyle} to="/minionPool">Modify Minion Pool</Link>
            </header>

        );
    }
}

const linkStyle = {
    color: '#ffffff',
    fontSize: '16px',
    textDecoration: 'none'
};

export default Header;