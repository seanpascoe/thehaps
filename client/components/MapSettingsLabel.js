import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const MapSettingsLabel = (props) => {
  let startDate = moment(props.filter.startDate, 'x', true).format('MMM Do');
  let endDate = moment(props.filter.endDate, 'x', true).format('MMM Do');

  let display = props.iw || props.view.icon === 'map' ? 'none' : 'block';
  let eventLabelColor = props.numMapEvents < props.numFilteredEvents ? 'red' : 'white';

  return (
    <div className="filter-sideNav" style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', fontWeight: '300'}} data-activates="slide-out1">
      <div id="settingslabel" style={{
        display,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        zIndex: '997',
        color: 'white',
        padding: '0px 10px',
        borderBottomLeftRadius: '2px',
        borderBottomRightRadius: '2px'}}>
        <span>{`Cat: ' ${props.filter.selectedCategory} '`}</span>
        <span style={{marginLeft: '10px'}}>{`Rng: ${startDate} - ${endDate}`}</span>
        <span style={{marginLeft: '10px', color: eventLabelColor}}>{`Evts: ${props.numMapEvents}/${props.numFilteredEvents}`}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { filter: state.filter, view: state.view };
};

export default connect(mapStateToProps)(MapSettingsLabel);
