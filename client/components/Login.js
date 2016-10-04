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
    let styles = {
      fontWeight: {fontWeight: '300'},
      fontSize: {fontSize: '30px'},
      formBackground: {backgroundColor: 'rgba(128, 128, 128, 0.09)', borderRadius: '15px'}
    }
    return (
      <div className="container" style={styles.fontWeight}>
        <p style={styles.fontSize}>Login</p>
        <div style={styles.formBackground}>
          <form onSubmit={this.signIn} style={{padding: '20px'}}>
            <label><input type="email" ref="email" placeholder="email"/></label>
            <label><input type="password" ref="password" placeholder="password" /></label><br />
            <div className="center">
              <button className="btn" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
