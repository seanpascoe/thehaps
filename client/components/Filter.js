import React from 'react';
import { connect } from 'react-redux';
import categories from './categories';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state= {categories, selectedCategory: ''};
  }

  componentDidMount() {
    //Option Selector for category
    window.jQuery('select').material_select();
  }

  catSelect(e) {
    this.props.dispatch({type: 'SET_SELECTED_CATEGORY', selectedCategory: e.target.value});
  }

  render() {

    let filtCat = this.props.filter.selectedCategory;
    let filteredEvents = this.props.events.filter(event => {
      // console.log(event.primCategory, event.primSubCategory, event.secCategory, event.secSubCategory)
      return (
        filtCat === event.primCategory ||
        filtCat === event.primSubCategory ||
        filtCat === event.secCategory ||
        filtCat === event.secSubCategory)
    });
    console.log(filtCat)
    
    console.log(filteredEvents);






    let categories = this.state.categories;
    let categorySelect = [];
    let rando = Math.floor(Math.random() * 1000000000);

    for(let parentCat in categories) {
      categorySelect.push(
        <option key={`${parentCat}-${rando}`} className="parCatFilter" style={{fontWeight: 'bold'}} value={parentCat}>{parentCat}</option>
      );
      categories[parentCat].forEach( cat => {
        categorySelect.push(<option key={`${cat}-${rando}`} style={{marginLeft: '10px'}} value={cat}>{cat}</option>);
      });

    }
    return(
      <div id="slide-out1" className="side-nav">
        <h3>Filter</h3>
        <div className="col s12">
          <label>Filter By Category</label>
          <select onChange={(e) => this.catSelect(e)} value={this.props.filter.selectedCategory} className="browser-default">
            <option defaultValue="" disabled selected>Choose a category</option>
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
