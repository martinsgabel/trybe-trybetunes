import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      artist: '',
      album: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const songsResult = await getMusics(id);

    this.setState({
      songs: songsResult,
      artist: songsResult[0].artistName,
      album: songsResult[0].collectionName,
    });
  }

  render() {
    const { songs, artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ artist }</h3>
        <h4 data-testid="album-name">{ album }</h4>
        {songs.slice(1).map(({ trackId, trackName, previewUrl }) => (
          <div key={ trackId }>
            <MusicCard
              trackId={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
