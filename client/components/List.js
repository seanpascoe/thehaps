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
    return a.timeValue - b.timeValue;
  }

  render() {
    let startDate = moment(this.props.filter.startDate, 'x', true).format('MMM Do');
    let endDate = moment(this.props.filter.endDate, 'x', true).format('MMM Do');
    let styles = {
      head: {fontSize: '18px', paddingTop: '5px', paddingBottom: '5px', marginBottom: '0', fontWeight: '300', cursor: 'pointer'},
      listContainer: {display: this.props.view.listDisplay, fontWeight: '300'},
      row: {marginBottom: 0},
      ul: {margin: '0'},
      time: {fontWeight: '500'},
      date: {fontWeight: '400'},
      moreEvents: {fontSize: '20px', lineHeight: '64px', fontWeight: '300', paddingLeft: '25px', color: 'gray'}
    };

    let sortedEvents = this.props.filteredEvents.sort(this.sortEvents);

    let events = sortedEvents.map(event => {
      let catIcon = event.primCategory.replace(/ /g, '-').replace('&', 'and');
      let startTime = moment(event.startTime, 'HH:mm', true).format('h:mm a');
      let date = moment(event.date, 'MMMM D, YYYY', true).format('MMM Do');
      return (
        <li
          key={event._id}
          className="modal-trigger collection-item avatar"
          onClick={ (e) => {e.preventDefault();this.eventDetails(event._id);}}
          style={{ cursor: 'pointer' }}>
          <div className="row event-row" style={styles.row}>
            <div className="col s1">
              <img src={`/images/icons/${catIcon}.svg`} alt=""/>
            </div>
            <div className="col s8">
              <span className="title" style={{fontWeight: '400'}}>{event.title}</span>
              <p style={{textOverflow: 'ellipsis'}}>
                {event.locationName}
                <br/>
                {event.primCategory}{event.primSubCategory ? ` : ${event.primSubCategory}` : ''}
              </p>
            </div>
            <div className="col s3">
              <div className="right" style={styles.dateTime}>
                <div style={styles.time}>{startTime === '12:00 am' ? 'see det.' : startTime}</div>
                <div style={styles.date}>{date}</div>
              </div>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div style={styles.listContainer}>
        <div data-activates="slide-out1" className="row filter-sideNav" style={styles.head}>
          <div className="col m6"><span className="right"><span style={{fontWeight: '200'}}>Category: </span>{`"${this.props.filter.selectedCategory}"`}</span></div>
          <div className="col m6"><span style={{fontWeight: '200'}}>Range:</span>{` ${startDate} -- ${endDate}`}</div>
        </div>
        <ul className="collection" style={styles.ul}>
          {events}
          <li
            className="collection-item filter-sideNav"
            data-activates="slide-out1"
            style={{ cursor: 'pointer', minHeight: '84px' }}>
            <div className="moreEvents" style={styles.moreEvents}><span style={{borderBottom: '1px solid gray'}}>adjust filter for more events</span></div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, view: state.view, filter: state.filter };
};

export default connect(mapStateToProps)(List);
