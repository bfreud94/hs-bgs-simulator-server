import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getCurrentRoll } from '../../actions/reRollActions';
import { setTier } from '../../actions/tierActions';
import { addTavernMinionsToPool, removeTavernMinionsFromPool, uniqueMinions } from '../../actions/poolActions';
import Card from '../Card/Card';
import TribalChangeButtons from '../TribalChangeButtons/TribalChangeButtons';
import store from '../../store';
import './Board.css';

class Board extends Component {

    componentDidMount() {
        const { minionPool } = store.getState().pool;
        if (minionPool.length === 0) {
            this.props.uniqueMinions();
            this.props.addTavernMinionsToPool(store.getState().tier);
        }
    }

    reRoll = () => {
        const { tier } = store.getState();
        this.props.getCurrentRoll(tier);
    }

    tavernUp = () => {
        const { tier } = store.getState();
        const updatedTier = tier < 6 ? tier + 1 : tier;
        this.props.addTavernMinionsToPool(updatedTier);
        this.props.setTier(updatedTier);
    }

    tavernDown = () => {
        const { tier } = store.getState();
        const updatedTier = tier > 1 ? tier - 1 : tier;
        this.props.getCurrentRoll(updatedTier);
        this.props.removeTavernMinionsFromPool(updatedTier);
        this.props.setTier(updatedTier);
    }

    tavernUpAndDownElements = () => {
        const serverUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8000' : '';
        const { tier } = store.getState();
        const tavernUpURL = `${serverUri}/assets/img/tavernUp.png`;
        const tavernDownURL = `${serverUri}/assets/img/tavernDown.png`;
        const reRollURL = `${serverUri}/assets/img/reRoll.png`;
        return (
            <React.Fragment>
                <p className='tier-number-tavern-up' style={{ display: tier === 6 ? 'none' : 'initial' }}>{tier + 1}</p>
                <p className='tier-number-tavern-down' style={{ display: tier === 1 ? 'none' : 'initial' }}>{tier - 1}</p>
                <img className='tavern-up' src={tavernUpURL} alt='TavernUp' onClick={() => this.tavernUp()} style={{ display: tier === 6 ? 'none' : 'initial' }} />
                <img className='reroll' src={reRollURL} alt='ReRoll' onClick={() => this.reRoll()} />
                {tier !== 1 ? <img className={`tavern-tier-${tier}`} src={`${serverUri}/assets/img/tier${tier}.png`} alt='TavernTier' /> : <React.Fragment />}
                <img className='tavern-down' src={tavernDownURL} alt='TavernDown' onClick={() => this.tavernDown()} style={{ display: tier === 1 ? 'none' : 'initial' }} />
            </React.Fragment>
        );
    }

    displayCards = () => {
        const serverUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8000' : '';
        const { currentRoll } = store.getState();
        const board = [];
        currentRoll.minions.forEach((minion, index) => {
            const numberToWord = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six' };
            const minionName = minion.minionName.charAt(0) + _.camelCase(minion.minionName.substring(1));
            const minionTier = numberToWord[minion.tier];
            const imageURL = `${serverUri}/assets/img/Tier${minionTier}/${minion.tribe}/${minionName}.png`;
            board.push(
                <Card dimensions={[150, 208]} key={minion.minionName + index} imageURL={imageURL} alternativeText={minion.minionName} />
            );
        });
        return (
            <React.Fragment>
                {board}
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className='board-wrapper' style={{backgroundImage: `url(${process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : ''}/assets/img/board.png)`}}>
                <TribalChangeButtons />
                <React.Fragment>{this.tavernUpAndDownElements()}</React.Fragment>
                <div className='card-display'>{this.displayCards()}</div>
            </div>
        );
    }
}

Board.propTypes = {
    addTavernMinionsToPool: PropTypes.func.isRequired,
    getCurrentRoll: PropTypes.func.isRequired,
    removeTavernMinionsFromPool: PropTypes.func.isRequired,
    setTier: PropTypes.func.isRequired,
    uniqueMinions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    tier: state.tier,
    pool: state.pool.minionPool,
    currentRoll: state.currentRoll
});

export default connect(mapStateToProps, { addTavernMinionsToPool, removeTavernMinionsFromPool, getCurrentRoll, setTier, uniqueMinions })(Board);