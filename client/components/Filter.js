import React from 'react';
import { connect } from 'react-redux';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="slide-out1" className="side-nav">
        <p>This is the filter</p>
      </div>
    )
  }
}


export default connect()(Filter);
