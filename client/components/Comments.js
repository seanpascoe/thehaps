import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/comment';
import { Link } from 'react-router';
import { login } from '../actions/userauth';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentValue: '',
      showSignIn: false,
      signInLoading: false
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentCancel = this.handleCommentCancel.bind(this);
    this.showSubmitBox = this.showSubmitBox.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.showSignIn = this.showSignIn.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn(e) {
    e.preventDefault();
    this.props.dispatch({type: 'LOGIN_LOADING'});
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    this.props.dispatch(login(email, password));
  }

  handleCommentChange(e) {
    this.setState({commentValue: e.target.value});
  }

  handleCommentCancel() {
    this.setState({commentValue: ''});
  }

  submitComment() {
    let eventId = this.props.details._id;
    let userId = this.props.auth.id;
    let userName = this.props.auth.username;
    let commentBody = this.state.commentValue.trim();
    if(commentBody.length < 1) return;



    this.props.dispatch(addComment(eventId, userId, userName, commentBody));
    this.setState({commentValue: ''});
  }

  closeDetails() {
    window.jQuery('#event-detail').modal('close');
  }

  showSignIn() {
    this.setState({showSignIn: !this.state.showSignIn});
  }

  signInBox() {
    let styles = {
      fontWeight: {fontWeight: '300'},
      formBackground: {backgroundColor: 'rgba(128, 128, 128, 0.09)', borderRadius: '5px', padding: '5px', marginTop: '5px'},
      submitButton: {margin: '20px 0px 15px 0px', backgroundColor: 'lightgray'}
    };

    let spinner = (<div className="preloader-wrapper small active" style={{width: '25px', height: '25px', marginTop: '5px',}}>
                    <div className="spinner-layer spinner-blue-only">
                      <div className="circle-clipper left">
                        <div className="circle"></div>
                      </div><div className="gap-patch">
                        <div className="circle"></div>
                      </div><div className="circle-clipper right">
                        <div className="circle"></div>
                      </div>
                    </div>
                  </div>);

    if(this.state.showSignIn) {
      return (
        <form className='row' onSubmit={this.signIn} style={styles.formBackground}>
          <div className='input-field col s4'>
            <input type="email" ref="email" className='validate' required />
            <label>Email</label>
          </div>
          <div className='input-field col s4'>
            <input type="password" ref="password" className='validate' required />
            <label>Password</label>
          </div>
          <div className="col s4">
            <button className="btn waves-effect btn-flat" style={styles.submitButton} type="submit">{this.props.loginLoading ? spinner : 'Login'}</button>
          </div>
          <div className="right" style={{marginRight: '5px'}}>
            <Link to="/signup" onClick={this.closeDetails} style={styles.fontWeight}>Don't have an account?</Link>
          </div>
        </form>
      );
    } else {
      return '';
    }
  }

  showSubmitBox(styles) {
    if(this.props.auth.isAuthenticated) {
      return (
        <form>
          <div className="input-field">
            <textarea id="comment" type="text" className="materialize-textarea" onChange={this.handleCommentChange} value={this.state.commentValue}></textarea>
            <label htmlFor="comment">Add a comment...</label>
          </div>
          <div className="right">
            <span onClick={this.handleCommentCancel} style={styles.cancel}>Cancel</span>
            <a onClick={this.submitComment} style={styles.submit}>Comment</a>
          </div>
        </form>
      );
    } else {
      return (
        <div>
          <a style={styles.addAComment} onClick={this.showSignIn}>Add a comment...</a>
          {this.signInBox()}
        </div>
      );
    }
  }


  render() {
    const styles = {
      cancel: {marginRight: '15px', cursor: 'pointer'},
      submit: {cursor: 'pointer', marginRight: '10px'},
      commentSection: {borderTop: '2px solid #9e9e9e', marginTop: '20px'},
      commentBlock: {borderBottom: '1px solid #9e9e9e', padding: '20px 10px 10px'},
      commentBody: {fontSize: '14px'},
      commentUsername: {fontSize: '11px', color: '#9e9e9e', fontWeight: 'bold'},
      commentDateTime: {fontSize: '11px', color: '#9e9e9e', marginTop: '10px'},
      addAComment: {cursor: 'pointer', marginLeft: '5px'}
    };

    let commentsArr = this.props.details.comments || [];
    let comments = commentsArr.map((comment) => {
      // let timeDateCreated = moment(comment.created).format('MMM Do h:mma');
      let timeDateCreated = moment(comment.created).fromNow();
      return (
        <div key={comment._id} style={styles.commentBlock}>
          <div style={styles.commentUsername}>{comment.userName}</div>
          <div style={styles.commentBody}>{comment.commentBody}</div>
          <div style={styles.commentDateTime}>{timeDateCreated}</div>
        </div>
      );
    });

    return (
      <div>
        <h5>Comments</h5>
        <div className="clearfix">
          {this.showSubmitBox(styles)}
        </div>
        <div style={styles.commentSection}>
          {comments}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.details,
    auth: state.auth,
    loginLoading: state.view.loginLoading
  };
};

export default connect(mapStateToProps)(Comments);
