import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  isChecked(album) {
    this.setState({
      checked: true,
    });

    console.log(album);

    addToFav(album);
  }

  async addToFav(album) {
    const { checked } = this.state;
    if (checked) {
      await addSong(album);
    }
  }

  render() {
    const { album: { trackId, trackName, previewUrl } } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <p>
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </p>
        </audio>
        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor="checkbox-id"
        >
          Favorita
          <input
            type="checkbox"
            id="checkbox-id"
            onClick={ () => this.isChecked(album) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
