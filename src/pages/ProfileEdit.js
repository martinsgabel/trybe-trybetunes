import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.updateInput = this.updateInput.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.gettingUser = this.gettingUser.bind(this);

    this.state = {
      loading: true,
      disabled: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

  handleDisable() {
    const { name, email, description, image } = this.state;

    if (name && email && description && image) {
      this.setState({
        disabled: false,
      });
    }
  }

  async gettingUser() {
    const user = await getUser();

    this.setState({
      loading: false,
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
    }, () => { this.handleDisable(); });
  }

  saveUser() {
    const { name, email, description, image } = this.state;
    const userObj = {
      name,
      email,
      image,
      description,
    };

    this.setState({
      loading: true,
    }, async () => {
      await updateUser(userObj);
      this.setState({
        redirect: true,
      });
    });
  }

  updateInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => { this.handleDisable(); });
  }

  render() {
    const { loading, disabled, name, email, description, image, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {redirect && <Redirect to="/profile" />}
        {loading ? <Loading /> : (
          <form>
            <input
              data-testid="edit-input-name"
              type="text"
              placeholder="Name"
              required="required"
              value={ name }
              name="name"
              onChange={ (e) => this.updateInput(e) }
            />
            <input
              data-testid="edit-input-email"
              type="email"
              placeholder="email"
              value={ email }
              name="email"
              onChange={ (e) => this.updateInput(e) }
            />
            <input
              data-testid="edit-input-description"
              type="text"
              placeholder="description"
              required="required"
              value={ description }
              name="description"
              onChange={ (e) => this.updateInput(e) }
            />
            <input
              data-testid="edit-input-image"
              type="text"
              placeholder="image"
              required="required"
              value={ image }
              name="image"
              onChange={ (e) => this.updateInput(e) }
            />
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ disabled }
              onClick={ () => this.saveUser() }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
