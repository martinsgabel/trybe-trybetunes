import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addToFav = this.addToFav.bind(this);

    this.state = {
      loading: false,
      addedSong: [],
      checked: false,
    };
  }

  componentDidMount() {
    const { checked } = this.props;
    console.log(checked);

    this.setState({
      checked,
    });
  }

  async addToFav(song) {
    this.setState({
      loading: true,
    });

    await addSong(song);

    const { addedSong } = this.state;

    this.setState({
      addedSong: [...addedSong, song],
      loading: false,
      checked: true,
    });
  }

  render() {
    const { song, trackId, trackName, previewUrl } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
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
              htmlFor={ trackId }
            >
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                defaultChecked={ checked }
                onClick={ () => this.addToFav(song) }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
