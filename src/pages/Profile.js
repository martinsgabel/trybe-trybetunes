import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();

    console.log(user);

    this.setState({
      loading: false,
      user,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <h2>{ user.name }</h2>
            <p>{ user.email }</p>
            <p>{ user.description }</p>
            <img data-testid="profile-image" src={ user.image } alt="foto" />
            <Link to="/profile/edit">
              <button type="button">Editar perfil</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
