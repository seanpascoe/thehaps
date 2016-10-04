import React from 'react';
import { connect } from 'react-redux';

const DetailView = (props) => {
  let styles = {
    modalWrapper: {fontWeight: '300', maxHeight: "65%"},
    noMargin: {margin: '0px'},
    divMargin: {marginTop: '10px'}
  };

  return (
    <div id="event-detail" className="modal bottom-sheet" style={styles.modalWrapper}>
      <div className="modal-content">
        <div className="row">
          <div className="col s12">
            <h5 className="center" style={styles.fontWeight}>{props.details.eventDetail.title}</h5>
          </div>
          <div className="col s12 m4" style={styles.divMargin}>
            <p style={styles.noMargin}>{props.details.eventDetail.date}</p>
            <p style={styles.noMargin}>Time: {props.details.eventDetail.startTime} - {props.details.eventDetail.endTime}</p>
          </div>
          <div className="col s12 m4" style={styles.divMargin}>
            <p style={styles.noMargin}>{props.details.eventDetail.locationName}</p>
            <p style={styles.noMargin}>{props.details.eventDetail.address}</p>
            <p style={styles.noMargin}>{props.details.eventDetail.city}, {props.details.eventDetail.state}</p>
          </div>
          <div className="col s12 m4" style={styles.divMargin}>
            <p style={styles.noMargin}>Hosted By: {props.details.eventDetail.host}</p>
            <p style={styles.noMargin}>Contact Info: <a href={`tel:${props.details.eventDetail.contactNumber}`}>{props.details.eventDetail.contactNumber}</a></p>
            <p style={styles.noMargin}>Description: {props.details.eventDetail.description}</p>
            <p style={styles.noMargin}>URL: <a href={props.details.eventDetail.url} target="_blank">{props.details.eventDetail.url}</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { details: state.details };
};

export default connect(mapStateToProps)(DetailView);
