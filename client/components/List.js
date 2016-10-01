import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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

  render() {
    let events = this.props.filteredEvents.map(event => {
      return (
        <a
          key={event._id}
          className="modal-trigger collection-item avatar"
          onClick={ (e) => {e.preventDefault();this.eventDetails(event._id);}}
          style={{ cursor: 'pointer' }}>
          <li>
            <img style={{borderRadius: '0'}} src="images/icons/soccer.png" alt="" className="circle" />
            <span className="title">{event.title}</span>
            <p>{event.locationName}
              <br/>
              {event.date}
            </p>
            <span className="secondary-content">{event.startTime}</span>
          </li>
        </a>
      );
    });

    let styles = {
      title: {fontSize: '30px'},
      listContainer: {display: this.props.view.listDisplay, fontWeight: '200'}
    };

    return (
      <div style={styles.listContainer}>
        <p style={styles.title}>Events</p>
        <ul className="collection">
          {events}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, view: state.view, details: state.details };
};

export default connect(mapStateToProps)(List);
