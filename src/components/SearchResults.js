import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class SearchResults extends React.Component {
  render() {
    const { albums, artist } = this.props;
    return (
      <div>
        {!albums.length ? (
          <div>
            <p>{`Resultado de álbuns de: ${artist}`}</p>
            <p>Nenhum álbum foi encontrado</p>
          </div>
        ) : (
          <div>
            <p>{`Resultado de álbuns de: ${artist}`}</p>
            <div>
              {albums.map((
                { collectionId, artworkUrl100,
                  collectionName, artistName },
              ) => (
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                  key={ collectionId }
                >
                  <AlbumCard
                    image={ artworkUrl100 }
                    album={ collectionName }
                    artist={ artistName }
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

SearchResults.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
  })).isRequired,
  artist: PropTypes.string.isRequired,
};

export default SearchResults;
