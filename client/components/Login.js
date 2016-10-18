import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/userauth';
import { Link } from 'react-router';

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
      title: {fontSize: '30px', margin: '20px 0 20px'},
      formBackground: {backgroundColor: 'rgba(128, 128, 128, 0.09)', borderRadius: '15px', padding: '20px'},
      submitButton: {margin: '10px 0px 15px 0px', backgroundColor: '#2C3E50'}
    };
    return (
      <div className="container" style={styles.fontWeight}>
        <div style={styles.title}>Login</div>
        <form className='row' onSubmit={this.signIn} style={styles.formBackground}>
          <div className='input-field col s12'>
            <input type="email" ref="email" className='validate' required />
            <label>Email</label>
          </div>
          <div className='input-field col s12'>
            <input type="password" ref="password" className='validate' required />
            <label>Password</label>
          </div>
          <div className="center">
            <button className="btn waves-effect waves-light" style={styles.submitButton} type="submit">Login</button>
          </div>
          <div className="right">
            <Link to="/signup" style={styles.fontWeight}>Don't have an account?</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
