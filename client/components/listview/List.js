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
    window.jQuery(`#${id}`).openModal();
  }

  render() {
    let events = this.props.events.map(event => {
      return (
        <div key={event._id}>
          <a className="modal-trigger collection-item avatar"
             onClick={ (e) => {e.preventDefault();this.eventDetails(event._id);}}
             style={{ cursor: 'pointer' }}>
            <li>
              <img style={{borderRadius: '0'}} src="images/icons/soccer.png" alt="" className="circle" />
              <span className="title">{event.title}</span>
              <p>Location Name <br/>
                 {event.category[0]}
              </p>
              <span className="secondary-content">{event.startTime}</span>
            </li>
          </a>
          <div id={event._id} className="modal bottom-sheet">
            <div className="modal-content">
            <h2 className="center">{event.title}</h2>
            <h3>{event.date}</h3>
            <p>Time: {event.startTime} - {event.endTime}</p>
            <p>LOCATION NAME HERE</p>
            <p>{event.address}</p>
            <p>{event.city}, {event.state}</p>
            <br />
            <p>Description: {event.description}</p>
            <p>URL: <a href={event.url}>{event.url}</a></p>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h3>Events</h3>
        <ul className="collection">
          {events}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { events: state.events };
};

export default connect(mapStateToProps)(List);
