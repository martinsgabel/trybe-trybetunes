import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.checkFavSongs = this.checkFavSongs.bind(this);

    this.state = {
      songs: [],
      artist: '',
      album: '',
      favSongsFetched: [],
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

    this.checkFavSongs();
  }

  async checkFavSongs() {
    const favSongsFetched = await getFavoriteSongs();

    this.setState({
      favSongsFetched,
    });
  }

  render() {
    const { songs, artist, album, favSongsFetched } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ artist }</h3>
        <h4 data-testid="album-name">{ album }</h4>
        {songs.slice(1).map((song) => (
          <div key={ song.trackId }>
            <MusicCard
              trackId={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              song={ song }
              favSongsFetched={ favSongsFetched }
              checked={ favSongsFetched.some((favsong) => (
                favsong.trackId === song.trackId)) }
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
