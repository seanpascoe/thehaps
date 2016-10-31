import React from 'react';
import { connect } from 'react-redux';

const MapSettingsLabel = (props) => {
  let startDate = moment(props.filter.startDate, 'x', true).format('MMM Do');
  let endDate = moment(props.filter.endDate, 'x', true).format('MMM Do');

  let display = props.iw || props.view.mapDisplay === 'none' ? 'none' : 'block';
  let eventLabelColor = props.numMapEvents < props.numFilteredEvents ? 'red' : 'white';

  return (
    <div className="filter-sideNav" style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}} data-activates="slide-out1">
      <div id="settingslabel" style={{
        display,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        zIndex: '997',
        color: 'white',
        padding: '0px 10px',
        fontWeight: '300',
        borderBottomLeftRadius: '2px',
        borderBottomRightRadius: '2px'}}>
        <span>{`Category: ' ${props.filter.selectedCategory} '`}</span>
        <span style={{marginLeft: '10px'}}>{`Range: ${startDate} - ${endDate}`}</span>
        <span style={{marginLeft: '10px', color: eventLabelColor}}>{`Events: ${props.numMapEvents}/${props.numFilteredEvents}`}</span>
        {/* <div style={{color: 'red', fontWeight: 300, display: `${props.numMapEvents === 100 ? 'block' : 'none'}`}}>
          Map events limit exceeded! Filter, Zoom, or switch to List View
        </div> */}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return { filter: state.filter, view: state.view }
};

export default connect(mapStateToProps)(MapSettingsLabel);
