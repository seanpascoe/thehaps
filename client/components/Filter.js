import React from 'react';
import { connect } from 'react-redux';
import categories from './categories';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state= {categories};
  }

  componentDidMount() {
    //Option Selector for category
    // window.jQuery('select').material_select();
  }

  capitalizeCat(cat) {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  catSelect(e) {
    this.props.dispatch({type: 'SET_SELECTED_CATEGORY', selectedCategory: e.target.value});
  }

  render() {
    let categories = this.state.categories;
    let categorySelect = [];
    let rando = Math.floor(Math.random() * 1000000000);

    for(let parentCat in categories) {
      categorySelect.push(
        <option key={`${parentCat}-${rando}`} className="parCatFilter" style={{fontWeight: 'bold'}} value={parentCat}>{this.capitalizeCat(parentCat)}</option>
      );
      categories[parentCat].forEach( cat => {
        categorySelect.push(<option key={`${cat}-${rando}`} style={{marginLeft: '10px'}} value={cat}>--{cat}</option>);
      });

    }
    return(
      <div id="slide-out1" className="side-nav">
        <h3>Filter</h3>
        <div className="col s12">
          <label>Filter By Category</label>
          <select onChange={(e) => this.catSelect(e)} value={this.props.filter.selectedCategory} className="browser-default">
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
