import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/comment';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentValue: ''
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentCancel = this.handleCommentCancel.bind(this);
    this.showSubmitBox = this.showSubmitBox.bind(this);
    this.submitComment = this.submitComment.bind(this);
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
        <a style={styles.addAComment}>Add a comment...</a>
      );
    }
  }


  render() {
    const styles = {
      cancel: {marginRight: '15px', cursor: 'pointer'},
      submit: {cursor: 'pointer'},
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
      <div className="row">
        <div className="col s12">
          <h5>Comments</h5>
          <div className="clearfix">
            {this.showSubmitBox(styles)}
          </div>
          <div style={styles.commentSection}>
            {comments}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.details,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Comments);
