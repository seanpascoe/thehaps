import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class EventDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    let id = this.props.params.id;
    let event = this.props.events.filter(e => {
      return e._id === id;
    });
    event = event[0];
    return(
      <div className="container">
        <h2 className="center">{event.title}</h2>
        <h3>{event.date}</h3>
        <p>Time: {event.startTime} - {event.endTime}</p>
        <br />
        <p>LOCATION NAME HERE</p>
        <p>{event.address}</p>
        <p>{event.city}, {event.state}</p>
        <br />
        <p>Description: {event.description}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: state.events };
};

export default connect(mapStateToProps)(EventDetail);
