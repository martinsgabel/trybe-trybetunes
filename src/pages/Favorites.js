import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favSongList: '',
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  async getSongs() {
    this.setState({
      loading: true,
    });

    const favSongList = await getFavoriteSongs();

    this.setState({
      favSongList,
    });
  }

  render() {
    const { loading, favSongList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          favSongList.map((favsonglist) => (
            <div key={ favsonglist.trackId }>
              <MusicCard
                trackId={ favsonglist.trackId }
                trackName={ favsonglist.trackName }
                previewUrl={ favsonglist.previewUrl }
                song={ favsonglist }
                checked="true"
              />
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
