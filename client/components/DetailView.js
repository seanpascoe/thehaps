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

      const mobileCheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };

      if(mobileCheck()) {
        return `http://calendar.google.com/calendar/gp#~calendar:view=e&bm=1${urlParams}`;
      }
      return `http://www.google.com/calendar/event${urlParams}`;
    })(event)

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
  return { details: state.details };
};

export default connect(mapStateToProps)(DetailView);
