import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomepageLayout from './components/homepage';
import LoginForm from './components/login';
import SignUpForm from './components/signup';
import Draft from './pages/Draft';
import Players from './pages/Players';
import League from './pages/League';
import MusicPlayer from './components/musicplayer';
import { Button, Container, Menu } from 'semantic-ui-react';

function AppRouter() {
  const url = window.location.pathname;
  const { fixed } = false;

  return (
    <div className="App">
      <Router>
        <div>
          <Menu
            style={{ background: '#1b1c1d', margin: '0', paddingTop: '1rem' }}
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <Container>
              <Menu.Item as="a" href="/" active={url === '/'}>
                Home
              </Menu.Item>
              <Menu.Item as="a" href="/draft" active={url === '/draft'}>
                Draft
              </Menu.Item>
              <Menu.Item as="a" href="/players" active={url === '/players'}>
                My Players
              </Menu.Item>
              <Menu.Item as="a" href="/league" active={url === '/league'}>
                My League
              </Menu.Item>
              <Menu.Item position="right">
                <Button as="a" href="/login/" inverted={!fixed}>
                  Log in
                </Button>
                <Button
                  as="a"
                  href="/signup/"
                  inverted={!fixed}
                  primary={fixed}
                  style={{ marginLeft: '0.5em' }}
                >
                  Sign Up
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
          <Route path="/" exact component={HomepageLayout} />
          <Route path="/login/" component={LoginForm} />
          <Route path="/signup/" component={SignUpForm} />
          <Route path="/draft/" exact component={Draft} />
          <Route path="/players/" exact component={Players} />
          <Route path="/league/" exact component={League} />
          <Route path="/music/" exact component={MusicPlayer} />
        </div>
      </Router>
    </div>
  );
}

export default AppRouter;
