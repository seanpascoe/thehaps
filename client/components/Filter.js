import React from 'react';
import { connect } from 'react-redux';
import categories from './categories';
import { fetchEvents } from '../actions/event';
import FaFilter from 'react-icons/lib/fa/filter';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaSlider from 'react-icons/lib/fa/sliders';
import MdClose from 'react-icons/lib/md/close';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state= {categories};
    this.dateSelect = this.dateSelect.bind(this);
  }

  componentDidMount() {
    window.jQuery('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 3,
      format: 'mmmm d, yyyy',
      today: false,
      clear: false,
      close: false,
      onClose: this.dateSelect,
      // closes datepicker on date select
      onSet: function( arg ){
        if ( 'select' in arg ){ //prevent closing on selecting month/year
          this.close();
        }
      }
    });
    this.syncDateSettings();
  }

  componentDidUpdate(prevProps) {
    //only run date sync when date filter settings change, not category or other settings
    if(prevProps.filter.startDate !== this.props.filter.startDate ||
      prevProps.filter.endDate !== this.props.filter.endDate)
      this.syncDateSettings();
  }

  syncDateSettings() {
    let picker1 = window.jQuery('.dpStartDate').pickadate('picker');
    picker1.set('select', parseInt(this.props.filter.startDate));

    let picker2 = window.jQuery('.dpEndDate').pickadate('picker');
    picker2.set('select', parseInt(this.props.filter.endDate));
  }

  capitalizeCat(cat) {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  catSelect(e) {
    this.props.dispatch({type: 'SET_SELECTED_CATEGORY', selectedCategory: e.target.value});
    window.jQuery('.slide-out1').sideNav('hide');
  }

  dateSelect() {
    let startDate = this.refs.startDate.value;
    let endDate = this.refs.endDate.value;
    let startTimeValue = moment(startDate, 'MMMM D, YYYY', true).format('x');
    let endTimeValue = moment(endDate, 'MMMM D, YYYY', true).endOf('day').format('x');

    this.props.dispatch(fetchEvents(startTimeValue, endTimeValue));
  }

  closeFilter() {
    window.jQuery('.slide-out1').sideNav('hide');
  }

  render() {
    let categories = this.state.categories;
    let categorySelect = [];

    for(let parentCat in categories) {
      categorySelect.push(
        <option key={`${parentCat}`} className="parCatFilter" value={parentCat}>{this.capitalizeCat(parentCat)}</option>
      );
      categories[parentCat].forEach( cat => {
        categorySelect.push(<option key={`${cat}`} value={cat}>--{cat}</option>);
      });
    }

    let styles = {
      container: {width: '90%', margin: '10px auto'},
      cursor: {cursor: 'pointer'},
      filterHeader: {fontSize: '30px', fontWeight: '300'},
      filterIcon: {marginBottom: '15px', marginRight: '15px'},
      calendarIcon: {marginRight: '10px'},
      close: {position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'}
    };

    return(
      <div id="slide-out1" className="side-nav">
        <MdClose size={'24px'} style={styles.close} onClick={this.closeFilter} />
        <div style={styles.container}>
          <div>
            <FaFilter size={'32px'} style={styles.filterIcon} />
            <span style={styles.filterHeader}>Filter</span>
          </div>
          <div className="col s12">
            <FaCalendar style={styles.calendarIcon} />
            <label>Start Date</label>
            <input style={styles.cursor} ref="startDate" className="datepicker dpStartDate" />
          </div>
          <div className="col s12">
            <FaCalendar style={styles.calendarIcon} />
            <label>End Date</label>
            <input style={styles.cursor} ref="endDate" className="datepicker dpEndDate" />
          </div>
          <div className="col s12">
            <FaSlider style={styles.calendarIcon}/>
            <label>Filter By Category</label>
            <select style={styles.cursor} onChange={(e) => this.catSelect(e)} value={this.props.filter.selectedCategory} className="browser-default catFilter">
              <option value="all">All Categories</option>
              {categorySelect}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {events: state.events, filter: state.filter};
};

export default connect(mapStateToProps)(Filter);
