import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <section className="main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route parth="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>

        {/* <nav>
          <ul>
            <li><Link to="/"></Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/album/:id">Album</Link></li>
            <li><Link to="/favorites">Favorites</Link>F</li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="profile/edit">ProfileEdit</Link></li>
          </ul>
        </nav> */}
      </section>
    );
  }
}

export default App;
