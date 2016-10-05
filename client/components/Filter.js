import React from 'react';
import { connect } from 'react-redux';
import categories from './categories';
import { fetchEvents } from '../actions/event';

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
  }

  componentDidUpdate(prevProps) {
    // if(!prevProps.filter.endDate) {
    let picker1 = window.jQuery('.dpStartDate').pickadate('picker');
    picker1.set('select', parseInt(this.props.filter.startDate));
    // }
    // if(!prevProps.filter.endDate) {
    let picker2 = window.jQuery('.dpEndDate').pickadate('picker');
    picker2.set('select', parseInt(this.props.filter.endDate));
    // }
  }

  capitalizeCat(cat) {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  catSelect(e) {
    this.props.dispatch({type: 'SET_SELECTED_CATEGORY', selectedCategory: e.target.value});
  }

  dateSelect() {
    let startDate = this.refs.startDate.value;
    let endDate = this.refs.endDate.value;
    let startTimeValue = moment(startDate, 'MMMM D, YYYY', true).format('x');
    let endTimeValue = moment(endDate, 'MMMM D, YYYY', true).endOf('day').format('x');

    this.props.dispatch(fetchEvents(startTimeValue, endTimeValue));

  }

  render() {
    let style = {
      cursor: 'pointer'
    };

    let categories = this.state.categories;
    let categorySelect = [];
    let rando = Math.floor(Math.random() * 1000000000);

    for(let parentCat in categories) {
      categorySelect.push(
        <option key={`${parentCat}-${rando}`} className="parCatFilter" value={parentCat}>{this.capitalizeCat(parentCat)}</option>
      );
      categories[parentCat].forEach( cat => {
        categorySelect.push(<option key={`${cat}-${rando}`} value={cat}>--{cat}</option>);
      });

    }
    return(
      <div id="slide-out1" className="side-nav">
        <h3>Filter</h3>
        <div className="col s12">
          <label>Start Date</label>
          <input style={style} ref="startDate" className="datepicker dpStartDate" />
        </div>
        <div className="col s12">
          <label>End Date</label>
          <input style={style} ref="endDate" className="datepicker dpEndDate" />
        </div>
        <div className="col s12">
          <label>Filter By Category</label>
          <select style={style} onChange={(e) => this.catSelect(e)} value={this.props.filter.selectedCategory} className="browser-default">
            <option value="all">All Categories</option>
            {categorySelect}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {events: state.events, filter: state.filter};
};

export default connect(mapStateToProps)(Filter);
