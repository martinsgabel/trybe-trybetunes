import React from 'react';
// import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login" className="login">
        Login
      </div>
    );
  }
}

export default Login;

/*
const { characterCheck } = this.props;

<input
  data-testid="login-name-input"
  onChange={ characterCheck }
/>
<button
  data-testid="login-submit-button"
  type="button"
  onClick={ createUser }
>
  Entrar
</button>

Login.propTypes = {
  characterCheck: PropTypes.func.isRequired,
};
*/
