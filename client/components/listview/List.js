import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    let events = this.props.events.map(event => {
      return (
        <Link to={`/event/${event._id}`} key={event._id} className="collection-item avatar" >
          <li>
            <img style={{borderRadius: '0'}} src="images/icons/soccer.png" alt="" className="circle" />
            <span className="title">{event.title}</span>
            <p>Location Name <br/>
               {event.category[0]}
            </p>
            <span className="secondary-content">{event.startTime}</span>
          </li>
        </Link>
      )
    });

    return (
      <div>
        <h3>Events</h3>
        <ul className="collection">
          {events}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: state.events };
};

export default connect(mapStateToProps)(List);
