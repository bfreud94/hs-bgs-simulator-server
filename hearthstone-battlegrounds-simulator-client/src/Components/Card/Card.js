import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {

    cardDimensions = () => {
        const { dimensions } = this.props;
        return {
            width: dimensions[0],
            height: dimensions[1]
        };
    }

    render() {
        const { imageURL, alternativeText } = this.props;
        return (
            <img style={this.cardDimensions()} src={imageURL} alt={alternativeText} />
        );
    }
}

Card.propTypes = {
    alternativeText: PropTypes.string,
    dimensions: PropTypes.array.isRequired,
    imageURL: PropTypes.string
};

Card.defaultProps = {
    alternativeText: '',
    imageURL: ''
};

export default Card;
