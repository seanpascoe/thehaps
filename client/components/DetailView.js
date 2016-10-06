import React from 'react';
import { connect } from 'react-redux';
import FaDirections from 'react-icons/lib/md/directions';

const DetailView = (props) => {
  let event = props.details.eventDetail;
  let date = moment(event.date, 'MMMM D, YYYY', true).format('dddd MMMM D, YYYY');
  let startTime = moment(event.startTime, 'HH:mm', true).format('h:mm a');
  let endTime = event.endTime ? moment(event.endTime, 'HH:mm', true).format('h:mm a') : '';


  let styles = {
    modalWrapper: {fontWeight: '300', maxHeight: '65%'},
    date: {fontSize: '1.5rem', fontweight: 'bold'},
    time: {fontSize: '1.3rem'},
    locationName: {fontSize: '1.1rem', fontWeight: 'bold', paddingTop: '10px'},
    location: {fontSize: '1.1rem'},
    directions: {paddingLeft: '10px'},
    infoLabels: {fontWeight: 'bold'},
    divMargin: {marginTop: '10px'},
    url: {clear: 'both', marginTop: '10px'}
  };

  return (
    <div id="event-detail" className="modal bottom-sheet" style={styles.modalWrapper}>
      <div className="modal-content">
        <div className="row">
          <div className="col s12">
            <h5 className="center" style={styles.fontWeight}>{event.title}</h5>
          </div>
          <div className="col s12 m4" style={styles.divMargin}>
            <div style={styles.date}>{date}</div>
            <div style={styles.time}>{`Time: ${startTime}` }{endTime ? ` - ${endTime}` : ''}</div>
            <div style={styles.locationName}>{event.locationName}</div>
            <div className='left'>
              <div style={styles.location}>{event.address}</div>
              <div style={styles.location}>{event.city}, {event.state}</div>
            </div>
            <a style={styles.directions} href={`https://maps.google.com?q=${event.address}+${event.city}+${event.state}`} target="_blank"><FaDirections size={'3rem'} /></a>
            <div style={styles.url}><a href={event.url} target="_blank">{event.url}</a></div>
          </div>

          <div className="col s12 m8" style={styles.divMargin}>
            <div><span style={styles.infoLabels}>{event.host ? 'Hosted By: ' : ''}</span>{event.host}</div>
            <div><span style={styles.infoLabels}>{event.contactNumber ? 'Contact #: ' : ''}</span><a href={`tel:${event.contactNumber}`}>{event.contactNumber}</a></div>
            <div><span style={styles.infoLabels}>Description:</span> {event.description ? event.description : 'no description'}</div>
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
