import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/userauth';

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
    this.props.dispatch(signup(email, password, this.props.history, this.state.redirect));
  }

  render() {
    let styles = {
      fontWeight: {fontWeight: '200'},
      fontSize: {fontSize: '30px'},
      formBackground: {backgroundColor: 'rgba(128, 128, 128, 0.09)', borderRadius: '15px'}
    };

    return(
      <div className="container" style={styles.fontWeight}>
        <p style={styles.fontSize}>Sign Up</p>
        <div style={styles.formBackground}>
          <form onSubmit={this.signUp} style={{padding: '20px'}}>
            <input type="email" ref="newEmail" placeholder="email" />
            <input type="password" ref="newPassword" placeholder="password" />
            <br />
            <div className="center">
              <button className="btn" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Signup);
