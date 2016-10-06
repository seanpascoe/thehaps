import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //change navbar icon and path
    this.props.dispatch({type: 'LIST_VIEW'});
  }

  eventDetails(id) {
    let event = this.props.filteredEvents.filter(e => {
      return e._id === id;
    });
    event = event[0];
    this.props.dispatch({ type: 'SET_EVENT', eventDetail: event});

    window.jQuery('#event-detail').openModal();
  }

  sortEvents(a, b) {
    return a.timeValue - b.timeValue
  }

  render() {
    let sortedEvents = this.props.filteredEvents.sort(this.sortEvents);

    let events = sortedEvents.map(event => {
      let catIcon = event.primCategory.replace(/ /g, '-').replace('&', 'and');
      let startTime = moment(event.startTime, 'HH:mm', true).format('h:mm a');
      let date = moment(event.date, 'MMMM D, YYYY', true).format('MMM Do');
      return (
        <a
          key={event._id}
          className="modal-trigger collection-item avatar"
          onClick={ (e) => {e.preventDefault();this.eventDetails(event._id);}}
          style={{ cursor: 'pointer' }}>
          <li>
            <img style={{borderRadius: '0'}} src={`/images/icons/${catIcon}.svg`} alt="" className="circle" />
            <span className="title">{event.title}</span>
            <p style={{textOverflow: 'ellipsis'}}>
              {event.locationName}
              <br/>
              {`${event.primCategory} : ${event.primSubCategory}`}
            </p>
            <div className="secondary-content">
              {startTime === '12:00 am' ? 'see Details' : startTime}
              <br/>
              {date}
            </div>
          </li>
        </a>
      );
    });

    let styles = {
      title: {fontSize: '25px', paddingTop: '10px'},
      listContainer: {display: this.props.view.listDisplay, fontWeight: '300'},
      ul: {marginBottom: 0}
    };

    return (
      <div style={styles.listContainer}>
        <div style={styles.title}>Events</div>
        <ul className="collection" style={styles.ul}>
          {events}
          <a
            className="modal-trigger collection-item"
            // onClick=
            style={{ cursor: 'pointer', minHeight: "84px" }}>
            <li>
              <div className="center" style={{fontSize: '2rem', lineHeight: '2rem'}}>Adjust Filter For More Events (finish this)</div>
            </li>
          </a>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, view: state.view, details: state.details };
};

export default connect(mapStateToProps)(List);
