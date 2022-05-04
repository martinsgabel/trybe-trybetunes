import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  async componentDidMount() {
    const userName = await getUser();

    this.setState({
      user: userName.name,
    });
  }

  render() {
    const { user } = this.state;
    return (
      !user ? <Loading />
        : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">{ user }</p>
            <Link to="/search" data-testid="link-to-search">
              <button type="button">Search</button>
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <button type="button">Favorites</button>
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <button type="button">Profile</button>
            </Link>
          </header>
        )
    );
  }
}

export default Header;
