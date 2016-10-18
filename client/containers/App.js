import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

    if (!this.props.auth.isAuthenticated) {
      if (localStorage.userId && localStorage.token) {
        this.props.dispatch({
          type: 'LOGIN',
          id: localStorage.userId,
          token: localStorage.token,
          email: localStorage.email,
          username: localStorage.username
        });
      }
    }

  }

  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(App);
