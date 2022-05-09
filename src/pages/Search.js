import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SearchResults from '../components/SearchResults';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.characterCheck = this.characterCheck.bind(this);
    this.startSearch = this.startSearch.bind(this);

    this.state = {
      buttonAvailability: true,
      searchName: '',
      searching: 1,
      artist: '',
      albums: [],
      magicNumber: 3,
    };
  }

  characterCheck({ target }) {
    const minimumNumber = 1;
    if (target.value.length > minimumNumber) {
      this.setState({
        buttonAvailability: false,
        searchName: target.value,
      });
    } if (target.value.length <= minimumNumber) {
      this.setState({
        buttonAvailability: true,
        searchName: target.value,
      });
    }
  }

  async startSearch(name) {
    this.setState({
      searching: 2,
    });

    const result = await searchAlbumsAPI(name);
    console.log(result);

    this.setState({
      searching: 3,
      albums: result,
      artist: name,
      searchName: '',
    });
  }

  render() {
    const { buttonAvailability, searchName, searching, albums,
      artist, magicNumber } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-page">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Digite uma banda ou artista"
              id="input-search"
              value={ searchName }
              onChange={ this.characterCheck }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ buttonAvailability }
              onClick={ () => this.startSearch(searchName) }
            >
              Pesquisar
            </button>
          </form>
          {searching === 2 && <Loading />}
          {searching === magicNumber
            && <SearchResults albums={ albums } artist={ artist } />}
        </div>
      </div>
    );
  }
}

export default Search;
