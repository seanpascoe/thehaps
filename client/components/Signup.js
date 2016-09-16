import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/userauth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    let redirect = this.props.location.query.redirect || '/home';
    this.state = { error: false, redirect };
  }

  signUp(e) {
    e.preventDefault();
    let email = this.refs.newEmail.value;
    let password = this.refs.newPassword.value;
    this.props.dispatch(signup(email, password, this.props.history, this.state.redirect));
  }

  render() {
    return(
      <div className="container">
        <h2 className="center">Sign Up</h2>
        <form onSubmit={this.signUp}>
          <input type="email" ref="newEmail" placeholder="email" />
          <input type="password" ref="newPassword" placeholder="password" />
          <br />
          <div className="center">
            <button className="btn" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Signup);
