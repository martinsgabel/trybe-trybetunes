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
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const songsResult = await getMusics(id);

    this.setState({
      songs: songsResult,
    });
  }

  render() {
    const { songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {songs.map(({ amgArtistId, trackName, previewUrl }) => (
          <div key={ amgArtistId }>
            <MusicCard trackName={ trackName } previewUrl={ previewUrl } />
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
