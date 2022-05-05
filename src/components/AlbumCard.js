import React from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { image, album, artist } = this.props;
    return (
      <div>
        <img src={ image } alt={ album } />
        <h3>{ album }</h3>
        <p>{ artist }</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  image: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default AlbumCard;
