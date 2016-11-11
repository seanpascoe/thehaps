import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      cancel: {marginRight: '15px'},
      commentSection: {borderTop: '2px solid #9e9e9e', marginTop: '20px'},
      commentBlock: {borderBottom: '1px solid #9e9e9e', padding: '20px 10px'},
      commentBody: {fontSize: '14px'},
      commentUsername: {fontSize: '11px', fontWeight: '500'},
      commentDateTime: {fontSize: '11px', color: '#9e9e9e'}
    };

    return (
      <div className="row">
        <div className="col s12">
          <h5>Comments</h5>
        <div className="clearfix">
            <form>
              <div className="input-field">
                <textarea id="comment" type="text" className="materialize-textarea"></textarea>
                <label htmlFor="comment">Add a comment...</label>
              </div>
              <div className="right">
                <span style={styles.cancel}>Cancel</span>
                <a>Comment</a>
              </div>
            </form>
          </div>
          <div style={styles.commentSection}>
            <div style={styles.commentBlock}>
              <div style={styles.commentUsername}>ShitForBrains</div>
              <div style={styles.commentBody}>Plaid vice umami, street art church-key yr flannel narwhal. Polaroid godard crucifix flexitarian, skateboard vice subway tile celiac fanny pack. Actually vexillologist kombucha blue bottle chillwave, portland cliche DIY succulents. Brooklyn put a bird on it kitsch kinfolk, tote bag tattooed succulents aesthetic pok pok.</div>
              <div style={styles.commentDateTime}>Nov. 11th 3:45pm</div>
            </div>
          </div>
          <div style={styles.commentBlock}>
            <div style={styles.commentUsername}>BoofHead</div>
            <div style={styles.commentBody}>Try-hard microdosing mlkshk ugh mustache freegan. Mumblecore keytar celiac sartorial pour-over, activated charcoal single-origin coffee before they sold out coloring book ethical meh.</div>
            <div style={styles.commentDateTime}>Nov. 11th 5:32pm</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.details
  };
};

export default connect(mapStateToProps)(Comments);
