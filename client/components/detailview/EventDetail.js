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
    return(
      <div>
        Hello
        {event[0].title}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: state.events };
};

export default connect(mapStateToProps)(EventDetail);
