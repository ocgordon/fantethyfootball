import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomepageLayout from './components/homepage';
import LoginForm from './components/login';
import SignUpForm from './components/signup';
import Web3Obj from './components/torushelper';

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>Log In</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login/">Log In</Link>
              </li>
              <li>
                <Link to="/signup/">Sign Up</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={HomepageLayout} />
          <Route path="/login/" component={LoginForm} />
          <Route path="/signup/" component={SignUpForm} />
        </div>
      </Router>
    </div>
  );
}

class App extends React.Component {
  componentDidMount() {
    const isTorus = sessionStorage.getItem('pageUsingTorus');

    if (isTorus) {
      Web3Obj.initialize().then(() => {
        this.setStateInfo();
      });
    }
  }

  setStateInfo = () => {
    Web3Obj.web3.eth.getAccounts().then(accounts => {
      this.setState({ account: accounts[0] });
      Web3Obj.web3.eth.getBalance(accounts[0]).then(balance => {
        this.setState({ balance: balance });
      });
    });
  };

  enableTorus = async () => {
    try {
      await Web3Obj.initialize();
      this.setStateInfo();
    } catch (error) {
      console.error(error);
    }
  };
}

export default AppRouter;
