import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.characterCheck = this.characterCheck.bind(this);
    this.creatingUser = this.creatingUser.bind(this);

    this.state = {
      buttonAvailability: true,
      userName: '',
      loadingOn: false,
      logado: false,
    };
  }

  async creatingUser(user) {
    this.setState({
      loadingOn: true,
    });

    await createUser({ name: user });

    this.setState({
      logado: true,
    });
  }

  characterCheck({ target }) {
    const minimumNumber = 2;
    if (target.value.length > minimumNumber) {
      this.setState({
        buttonAvailability: false,
        userName: target.value,
      });
    } if (target.value.length <= minimumNumber) {
      this.setState({
        buttonAvailability: true,
      });
    }
  }

  render() {
    const { buttonAvailability, userName, logado, loadingOn } = this.state;
    return (
      <div data-testid="page-login" className="login">
        {loadingOn ? <Loading />
          : (
            <div>
              <input
                data-testid="login-name-input"
                placeholder="Nome"
                onChange={ this.characterCheck }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                onClick={ () => this.creatingUser(userName) }
                disabled={ buttonAvailability }
              >
                Entrar
              </button>
            </div>) }
        {logado && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
