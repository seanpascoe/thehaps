import React from 'react';
import { connect } from 'react-redux';
import FaDirections from 'react-icons/lib/md/directions';
import FaLink from 'react-icons/lib/fa/external-link';
import MdClose from 'react-icons/lib/md/close';

class DetailView extends React.Component {
  constructor(props) {
    super(props);
  }

  closeDetails() {
    window.jQuery('#event-detail').modal('close');
  }

  render() {
    let event = this.props.details.eventDetail;
    let date = moment(event.date, 'MMMM D, YYYY', true).format('dddd MMMM D, YYYY');
    let startTime = moment(event.startTime, 'HH:mm', true).format('h:mm a');
    let endTime = event.endTime ? moment(event.endTime, 'HH:mm', true).format('h:mm a') : '';

    let calendarDateTime = moment(`${event.date} ${event.startTime}`, 'MMMM D, YYYY HH:mm').utc()
      .format('YYYYMMDDTHHmmss');
    calendarDateTime += 'Z'

    let calendarLink = (function(event) {
      const urlParams = `?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${calendarDateTime}/${calendarDateTime}&details=${encodeURIComponent(event.description)}&location=${event.locationName}+${event.address}+${event.city}+${event.state}&trp=false`;

      if(this.props.mobile) {
        return `http://calendar.google.com/calendar/gp#~calendar:view=e&bm=1${urlParams}`;
      }
      return `http://www.google.com/calendar/event${urlParams}`;
    }).bind(this)(event);

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

    return (
      <div id="event-detail" className="modal bottom-sheet" style={styles.modalWrapper}>
        <MdClose size={'24px'} style={styles.close} onClick={this.closeDetails} />
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

              <a href={calendarLink} target="_blank" rel="nofollow">Add to Google Calendar</a>

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
  }

}

const mapStateToProps = (state) => {
  return { details: state.details, mobile: state.mobile.mobile };
};

export default connect(mapStateToProps)(DetailView);
