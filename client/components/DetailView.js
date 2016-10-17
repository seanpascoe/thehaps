import React from 'react';
import { connect } from 'react-redux';
import FaDirections from 'react-icons/lib/md/directions';
import FaLink from 'react-icons/lib/fa/external-link';
import MdClose from 'react-icons/lib/md/close';

const DetailView = (props) => {
  let event = props.details.eventDetail;
  let date = moment(event.date, 'MMMM D, YYYY', true).format('dddd MMMM D, YYYY');
  let startTime = moment(event.startTime, 'HH:mm', true).format('h:mm a');
  let endTime = event.endTime ? moment(event.endTime, 'HH:mm', true).format('h:mm a') : '';

  let styles = {
    modalWrapper: {fontWeight: '300', maxHeight: '80%'},
    title: {fontWeight: '500'},
    categories: {fontSize: '18px'},
    date: {fontSize: '24px', fontweight: 'bold'},
    time: {fontSize: '21px'},
    locationName: {fontSize: '18px', fontWeight: 'bold', paddingTop: '10px'},
    location: {fontSize: '18px'},
    directions: {paddingLeft: '10px'},
    infoLabels: {fontWeight: 'bold'},
    divMargin: {marginTop: '10px'},
    url: {clear: 'both', marginTop: '10px'},
    close: {position: 'absolute', top: '7px', right: '7px', cursor: 'pointer'}
  };

  function closeFilter() {
    window.jQuery('#event-detail').closeModal();
  }

  return (
    <div id="event-detail" className="modal bottom-sheet" style={styles.modalWrapper}>
      <MdClose size={'24px'} style={styles.close} onClick={() => closeFilter()} />
      <div className="modal-content detailView">
        <div className="row">
          <div className="col s12">
            <h5 className="center" style={styles.title}>{event.title}</h5>
            <div className="center" style={styles.categories}>{event.primCategory}{event.primSubCategory ? ` : ${event.primSubCategory}` : ''}</div>
            <div className="center" style={styles.categories}>{event.secCategory ? ` ${event.secCategory}` : ''}{event.secSubCategory ? ` : ${event.secSubCategory}` : ''}</div>
          </div>
          <div className="col s12 m4" style={styles.divMargin}>
            <div style={styles.date}>{date}</div>
            <div style={styles.time}>{`Time: ${startTime}` }{endTime ? ` - ${endTime}` : ''}</div>
            <div style={styles.locationName}>{event.locationName}</div>
            <div className='left'>
              <div style={styles.location}>{event.address}</div>
              <div style={styles.location}>{event.city}, {event.state}</div>
            </div>
            <a style={styles.directions} href={`https://maps.google.com?q=${event.address}+${event.city}+${event.state}`} target="_blank"><FaDirections size={'48px'} /></a>
            {event.url ? <div style={styles.url}><a href={event.url} style={{fontSize: '17px'}} target="_blank">Event Link <FaLink size={'15px'} /></a></div> : ''}
          </div>

          <div className="col s12 m8" style={styles.divMargin}>
            <div><span style={styles.infoLabels}>{event.host ? 'Hosted By: ' : ''}</span>{event.host}</div>

            <div><span style={styles.infoLabels}>{event.contactNumber ? 'Contact Phone: ' : ''}</span><a href={`tel:${event.contactNumber}`}>{event.contactNumber}</a></div>

            <div><span style={styles.infoLabels}>{event.contactEmail ? 'Contact Email: ' : ''}</span><a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a></div>

            <div><span style={styles.infoLabels}>Description: </span>{event.description ? event.description : 'no description'}</div>
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
