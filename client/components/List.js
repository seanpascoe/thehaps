import React from 'react';
import { connect } from 'react-redux';
import { getSortedEvents } from '../selectors/selectors';
import { fetchEventDetails } from '../actions/event';
import ListSettingsLabel from './ListSettingsLabel';

class List extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   //change navbar icon and path
  //   this.props.dispatch({type: 'LIST_VIEW'});
  // }

  eventDetails(id) {
    window.jQuery('#event-detail').modal('open');
    window.jQuery('#event-detail').scrollTop(0);

    //gets event details from redux store (missing description)
    const event = this.props.sortedEvents.find(e => e._id === id);
    this.props.dispatch({type: 'SET_EVENT', eventDetail: event});

    //gets full event details from db
    this.props.dispatch(fetchEventDetails(id));
  }

  render() {
    let startDate = moment(this.props.filter.startDate, 'x', true).format('MMM Do');
    let endDate = moment(this.props.filter.endDate, 'x', true).format('MMM Do');
    let styles = {
      // listContainer: {display: this.props.view.listDisplay, fontWeight: '300'},
      row: {marginBottom: 0},
      ul: {margin: '0', border: 'none', borderTop: '1px solid #e0e0e0'},
      time: {fontWeight: '500'},
      date: {fontWeight: '400'},
      moreEvents: {fontSize: '20px', lineHeight: '64px', fontWeight: '300', paddingLeft: '25px', color: 'gray'}
    };

    let events = this.props.sortedEvents.map(event => {
      let catIcon = event.primCategory.replace(/ /g, '-').replace('&', 'and');
      let startTime = moment(event.startTime, 'HH:mm', true).format('h:mm a');
      let date = moment(event.date, 'MMMM D, YYYY', true).format('MMM Do');
      return (
        <li
          key={event._id}
          className="modal-trigger collection-item avatar"
          onClick={() => this.eventDetails(event._id)}
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
      <div id="listcontainer" style={styles.listContainer}>
        <ListSettingsLabel startDate={startDate} endDate={endDate} selectedCategory={this.props.filter.selectedCategory} numFilteredEvents={this.props.sortedEvents.length}/>
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
  return {
    sortedEvents: getSortedEvents(state),
    filter: state.filter };
};

export default connect(mapStateToProps)(List);
