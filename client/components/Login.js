import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/userauth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    let redirect = this.props.location.query.redirect || '/';
    this.state = { error: false, redirect };
  }

  signIn(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    this.props.dispatch(login(email, password, this.props.history, this.state.redirect));
  }

  render() {
    return (
      <div className="container">
        <h2 className="center">Login</h2>
        <form onSubmit={this.signIn}>
          <label><input type="email" ref="email" placeholder="email"/></label>
          <label><input type="password" ref="password" placeholder="password" /></label><br />
          <div className="center">
            <button className="btn" type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
