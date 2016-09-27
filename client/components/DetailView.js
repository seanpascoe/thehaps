import React from 'react';
import { connect } from 'react-redux';

const DetailView = (props) => {
  return (
    <div id="event-detail" className="modal bottom-sheet">
      <div className="modal-content">
      <h2 className="center">{props.details.eventDetail.title}</h2>
      <h3>{props.details.eventDetail.date}</h3>
      <p>Time: {props.details.eventDetail.startTime} - {props.details.eventDetail.endTime}</p>
      <p>LOCATION NAME HERE</p>
      <p>{props.details.eventDetail.address}</p>
      <p>{props.details.eventDetail.city}, {props.details.eventDetail.state}</p>
      <br />
      <p>Description: {props.details.eventDetail.description}</p>
      <p>URL: <a href={props.details.eventDetail.url} target="_blank">{props.details.eventDetail.url}</a></p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { details: state.details };
};

export default connect(mapStateToProps)(DetailView);
