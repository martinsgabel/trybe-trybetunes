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

  async addToFav(song) {
    this.setState({
      loading: true,
    });

    const resultado = await addSong(song);

    const { addedSong } = this.state;

    this.setState({
      addedSong: [...addedSong, song],
      loading: false,
      checked: true,
    }, () => console.log(resultado));
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
};

/*
Realizar a lógica do checked já do lado de fora, no album, e passar o valor checked por props/param
*/

export default MusicCard;
