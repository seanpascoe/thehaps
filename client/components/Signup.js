import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/userauth';
import { Link } from 'react-router';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    let redirect = this.props.location.query.redirect || '/';
    this.state = { error: false, redirect };
  }

  signUp(e) {
    e.preventDefault();
    let email = this.refs.newEmail.value;
    let password = this.refs.newPassword.value;
    let username = this.refs.newUserName.value;
    this.props.dispatch(signup(email, password, username, this.props.history, this.state.redirect));
  }

  render() {
    let styles = {
      fontWeight: {fontWeight: '300'},
      title: {fontSize: '30px', margin: '20px 0 20px'},
      formBackground: {backgroundColor: 'rgba(128, 128, 128, 0.09)', borderRadius: '5px', padding: '20px'},
      submitButton: {margin: '10px 0px 15px 0px', backgroundColor: '#2C3E50'}
    };

    return(
      <div className="container" style={styles.fontWeight}>
        <div style={styles.title}>Sign Up</div>
        <form className='row' onSubmit={this.signUp} style={styles.formBackground}>
          <div className='input-field col s12'>
            <input className='validate' type="email" ref="newEmail" required/>
            <label>Email</label>
          </div>
          <div className='input-field col s12'>
            <input className='validate' type="text" ref="newUserName" required/>
            <label>UserName</label>
          </div>
          <div className='input-field col s12'>
            <input className='validate' type="password" ref="newPassword" required />
            <label>Password</label>
          </div>
          <div className="center">
            <button className="btn waves-effect waves-light" type="submit" style={styles.submitButton}>Sign Up</button>
          </div>
          <div className="right">
            <Link to="/login" style={styles.fontWeight}>Already have an account?</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Signup);
