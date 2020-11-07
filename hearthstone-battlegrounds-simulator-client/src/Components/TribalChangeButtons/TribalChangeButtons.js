import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTribe, removeTribe } from '../../actions/poolActions';
import store from '../../store';
import './TribalChangeButtons.css';

class TribalChangeButtons extends Component {

    toggleTribe = (tribe) => {
        const { tribes } = store.getState().pool;
        tribes.includes(tribe) ? this.props.removeTribe(tribe) : this.props.addTribe(tribe);
    }

    isVisible = (tribe) => {
        const { tribes } = store.getState().pool;
        return {
            display: !tribes.includes(tribe) ? '' : 'none'
        };
    }

    formatTribe = (tribe) => (
        tribe.charAt(0).toLowerCase() + tribe.slice(1)
    );
    
    render() {
        const tribes = ['Beast', 'Demon', 'Dragon', 'Elemental', 'Mech', 'Murloc', 'Neutral', 'Pirate'];
        const serverUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8000' : '';
        return (
            <div>
                {tribes.map((tribe) =>
                    tribe !== 'Neutral' ?
                        <React.Fragment key={tribe}>
                            <img className='redx' style={this.isVisible(tribe)} src={`${serverUri}/assets/img/redx.png`} onClick={() => this.toggleTribe(tribe)} alt='Red X' />
                            <img className={`${this.formatTribe(tribe)}s`} src={`${serverUri}/assets/img/Tribes/${tribe}.png`} onClick={() => this.toggleTribe(tribe)} alt={tribe} />
                        </React.Fragment>
                    : <React.Fragment key={tribe} />
                )}
            </div>
        );
    }
}

TribalChangeButtons.propTypes = {
    addTribe: PropTypes.func.isRequired,
    removeTribe: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    tribes: state.pool.tribes
});

export default connect(mapStateToProps, { addTribe, removeTribe })(TribalChangeButtons);