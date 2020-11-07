import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Card, FormControl, IconButton, MenuItem, Select, Tab, Tabs } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import MinionCard from '../Card/Card';
import { getCurrentRoll } from '../../actions/reRollActions';
import { addMinion, addTavernMinionsToPool, removeTavernMinionsFromPool, removeMinion, uniqueMinions } from '../../actions/poolActions';
import { setTier } from '../../actions/tierActions';
import store from '../../store';
import './MinionPool.css';

class MinionPool extends Component {

    constructor() {
        super();
        this.state = {
            menuTier: 1,
            minionSelected: '',
            currentTab: 'Manipulate Minion Pool',
            imageLocation: ''
        };
    }

    componentDidMount() {
        const { pool, tier } = store.getState();
        if (pool.length === 0) {
            this.props.uniqueMinions();
            this.props.addTavernMinionsToPool(tier);
        } else {
            const { minionSelected } = this.state;
            const { minionPool } = store.getState().pool;
            if (minionPool.length > 0 && minionSelected === '') {
                this.setState({
                    minionSelected: minionPool[0].minionName,
                    imageLocation: minionPool[0].imageLocation
                });
            }
        }
    }

    componentDidUpdate() {
        const { minionSelected } = this.state;
        const { minionPool } = store.getState().pool;
        if (minionPool.length > 0 && minionSelected === '') {
            this.setState({
                minionSelected: minionPool[0].minionName,
                imageLocation: minionPool[0].imageLocation
            });
        }
    }

    changeState = (property, value) => {
        const { imageLocation } = this.state;
        const { uniqueMinions } = store.getState().pool;
        let updatedImageLocation = '';
        if (property === 'minionSelected') {
            Object.keys(uniqueMinions).forEach((tier) => {
                uniqueMinions[tier].forEach((minion) => {
                    if (minion.minionName === value) {
                        updatedImageLocation = minion.imageLocation;
                    }
                });
            });
        }
        this.setState({
            [property]: value,
            imageLocation: property === 'minionSelected' ? updatedImageLocation : imageLocation
        });
    }

    changeMenuTier = (e) => {
        const { uniqueMinions, tribes } = store.getState().pool;
        const filteredUniqueMinions = uniqueMinions[e.target.value].filter((minion) => tribes.includes(minion.tribe));
        this.setState({
            menuTier: e.target.value,
            minionSelected: filteredUniqueMinions[0].minionName,
            imageLocation: filteredUniqueMinions[0].imageLocation
        });
    }

    upgradeTier = (e, tier) => {
        if (tier !== 6) {
            this.props.setTier(tier + 1);
            this.props.addTavernMinionsToPool(tier + 1);
        }
    }

    downgradeTier = (e, tier) => {
        if (tier !== 1) {
            this.props.setTier(tier - 1);
            this.props.removeTavernMinionsFromPool(tier - 1);
            this.props.getCurrentRoll(tier - 1);
        }
    }

    menuItemStyles = () => ({
        padding: '5px 0px 5px 10px'
    });

    correctCase = (words) => (
        words.split(' ').map((word) => word.charAt(0) + word.substring(1).toLowerCase()).reduce((acc, curr) => acc + ' ' + curr)
    );

    aOrAn = (word) => {
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        return vowels.includes(word.charAt(0)) ? 'an' : 'a';
    }

    formatMinionName = (minionName) => (
        minionName === 'FoeReaper4000' ? 'Foe Reaper 4000' : minionName.replace(/([a-z])([A-Z])/g, '$1 $2').trim()
    );

    oddsToRollMinionOnSpecificTier = () => {
        const { minionSelected } = this.state;
        const { tier } = store.getState();
        const minionPool = store.getState().pool.minionPool.filter((minion) => minion.tier <= tier);
        const amountOfCertainMinion = minionPool.filter((minion) => minion.minionName === minionSelected).length;
        const tierToMinionsMap = { 1: 3, 2: 4, 3: 4, 4: 5, 5: 5, 6: 6 };
        let odds = 1;
        let numerator = minionPool.length - amountOfCertainMinion;
        let denominator = minionPool.length;
        for (let i = 0; i < tierToMinionsMap[tier]; i++) {
            odds *= (numerator / denominator);
            numerator--;
            denominator--;
        }
        return ((1 - odds) * 100).toFixed(2);
    }

    oddsToRollAUnitOfSpecificTier = () => {
        const { menuTier } = this.state;
        const { tier } = store.getState();
        let minionPool = store.getState().pool.minionPool.filter((minion) => minion.tier <= tier);
        let denominator = minionPool.length;
        minionPool = minionPool.filter((minion) => minion.tier !== menuTier);
        let odds = 1;
        let numerator = minionPool.length;
        const tierToMinionsMap = { 1: 3, 2: 4, 3: 4, 4: 5, 5: 5, 6: 6 };
        for (let i = 0; i < tierToMinionsMap[tier]; i++) {
            odds *= (numerator / denominator);
            numerator--;
            denominator--;
        }
        return ((1 - odds) * 100).toFixed(2);
    }

    menuItems = () => {
        const { menuTier, minionSelected } = this.state;
        const { uniqueMinions, tribes } = store.getState().pool;
        const { tier } = store.getState();
        const menuItems = [];
        if (Object.keys(uniqueMinions).length !== 0) {
            uniqueMinions[menuTier].forEach((minion) => {
                if (tribes.includes(minion.tribe)) {
                    menuItems.push(<MenuItem key={minion.minionName} value={minion.minionName}>{this.formatMinionName(minion.minionName)}</MenuItem>);
                }
            });
        }
        return (
            <div className='minion-pool-statistics-area'>
                <h1 className='minion-pool-tier-header'>
                    <IconButton onClick={(e) => this.downgradeTier(e, tier)}>
                        <Remove />
                    </IconButton>
                    <span>
                        Tier {tier}
                    </span>
                    <IconButton onClick={(e) => this.upgradeTier(e, tier)}>
                        <Add />
                    </IconButton>
                </h1>
                <div className='minion-pool-dropdown-wrapper'>
                    <h2>Tier</h2>
                    <FormControl className='minion-pool-dropdown'>
                        <Select value={menuTier} onChange={(e) => this.changeMenuTier(e)} disableUnderline
                            SelectDisplayProps={{
                                style: this.menuItemStyles()
                            }}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </FormControl>
                    <h2>Minion</h2>
                    <FormControl className='minion-pool-dropdown'>
                        <Select value={minionSelected} onChange={(e) => this.changeState('minionSelected', e.target.value)} disableUnderline
                            SelectDisplayProps={{
                                style: this.menuItemStyles()
                            }}
                        >
                            {menuItems}
                        </Select>
                    </FormControl>
                </div>
                {this.tableCards(store.getState().pool.minionPool)}
            </div>
        );
    }

    tableCards = (minions) => {
        const { currentTab, menuTier, minionSelected } = this.state;
        const { tier } = store.getState();
        const set = new Set();
        minions = minions.filter((minion) => minion.tier <= tier);
        const poolSize = minions.length;
        const amountOfMinionInPool = minions.filter((minion) => minion.minionName === minionSelected).length;
        minions = minions.filter((minion) => minion.tier === menuTier);
        const tierMinionsInPool = minions.length;
        minions.map((minion) => minion.minionName).forEach((minion) => set.add(minion));
        return (
            <React.Fragment>
                <AppBar position='static'>
                    <Tabs value={currentTab} onChange={(e) => this.changeState('currentTab', this.correctCase(e.target.innerText))}>
                        <Tab label='Totals' value='Totals' />
                        <Tab label='Percentages' value='Percentages' />
                        <Tab label='Manipulate Minion Pool' value='Manipulate Minion Pool' />
                    </Tabs>
                </AppBar>
                <Card className='material-ui-card'>
                    <div hidden={currentTab !== 'Totals'}>
                        <div>
                            <h2>{`Pool Size: ${poolSize}`}</h2>
                            <h2>{`Amount of ${this.formatMinionName(minionSelected)}s in the pool: ${amountOfMinionInPool}`}</h2>
                            <h2>{`Amount of Tier ${menuTier} minions in the pool: ${tierMinionsInPool}`}</h2>
                        </div>
                    </div>
                    <div hidden={currentTab !== 'Percentages'}>
                        <h2>{`Odds of rolling ${this.aOrAn(minionSelected)} ${this.formatMinionName(minionSelected)}: ${this.oddsToRollMinionOnSpecificTier()}%`}</h2>
                        <h2>{`Odds of rolling a Tier ${menuTier} unit: ${this.oddsToRollAUnitOfSpecificTier()}%`}</h2>
                    </div>
                    <div hidden={currentTab !== 'Manipulate Minion Pool'}>
                        <h2>{`Amount of ${this.formatMinionName(minionSelected)}s in the pool: ${amountOfMinionInPool}`}</h2>
                        <h2>
                            <span>Add Unit</span>
                            <IconButton onClick={() => this.props.addMinion(minionSelected, menuTier)}>
                                <Add />
                            </IconButton>
                        </h2>
                        <h2>
                            <span>Remove Unit</span>
                            <IconButton onClick={() => this.props.removeMinion(minionSelected)}>
                                <Remove />
                            </IconButton>
                        </h2>
                    </div>
                </Card>
            </React.Fragment>
        );
    }

    getMinionTribeFromUniqueMinions = () => {
        const { minionSelected } = this.state;
        const { uniqueMinions } = store.getState().pool;
        let minionSelectedTribe = '';
        Object.keys(uniqueMinions).forEach((tier) => {
            uniqueMinions[tier].forEach((minion) => {
                if (minion.minionName === minionSelected) {
                    minionSelectedTribe = minion.tribe;
                }
            });
        });
        return minionSelectedTribe;
    }

    render() {
        const { imageLocation, minionSelected } = this.state;
        const imageURL = process.env.NODE_ENV.trim() === 'development' ? `http://localhost:8000/assets${imageLocation}` : `/assets${imageLocation}`;
        return (
            <div className='minion-pool-wrapper'>
                <React.Fragment>
                    {minionSelected !== ''
                    ? <MinionCard minionPool dimensions={[300, 416]} imageURL={imageURL} alternativeText={minionSelected} />
                    : <React.Fragment />}
                </React.Fragment>
                {this.menuItems()}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    tier: state.tier,
    pool: state.pool
});

MinionPool.propTypes = {
    addMinion: PropTypes.func.isRequired,
    addTavernMinionsToPool: PropTypes.func.isRequired,
    getCurrentRoll: PropTypes.func.isRequired,
    removeMinion: PropTypes.func.isRequired,
    removeTavernMinionsFromPool: PropTypes.func.isRequired,
    setTier: PropTypes.func.isRequired,
    uniqueMinions: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { addMinion, addTavernMinionsToPool, getCurrentRoll, removeTavernMinionsFromPool, removeMinion, setTier, uniqueMinions })(MinionPool);