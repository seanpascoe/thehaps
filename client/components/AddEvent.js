import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../actions/event';
import categories from './categories';
import $ from 'jquery';
import FaCalendar from 'react-icons/lib/fa/calendar-plus-o';
import FaClock from 'react-icons/lib/fa/clock-o';
import FaPhone from 'react-icons/lib/fa/phone';
import FaUser from 'react-icons/lib/fa/user';
import FaGlobe from 'react-icons/lib/fa/globe';
import FaEnvelope from 'react-icons/lib/fa/envelope';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.addEvent = this.addEvent.bind(this);
    this.state = {categories};
  }

  componentDidMount() {
    //Date picker
    window.jQuery('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 3, // Creates a dropdown of 15 years to control year
      closeOnSelect: true,
      format: 'mmmm d, yyyy'
    });

    //Option Selector for category
    window.jQuery('select').material_select();
  }

  addEvent(e) {
    e.preventDefault();
    let primaryCategory = this.refs.primaryCategory.value;
    let splitPrimCat = primaryCategory.split(',');
    let secondaryCategory = this.refs.secondaryCategory.value;
    let splitSecCat = secondaryCategory.split(',');

    let title = this.refs.title.value;
    let primCategory = splitPrimCat[0];
    let primSubCategory = splitPrimCat[1];
    let secCategory = splitSecCat[0];
    let secSubCategory = splitSecCat[1];
    let locationName = this.refs.locationName.value;
    let address = this.refs.address.value;
    let city = this.refs.city.value;
    let state = this.refs.state.value;
    let description = this.refs.description.value;
    let date = this.refs.date.value;
    let startTime = this.refs.startTime.value;
    let endTime = this.refs.endTime.value;
    let url = this.refs.url.value;
    let host = this.refs.host.value;
    let contactEmail = this.refs.contactEmail.value;
    let contactNumber = this.refs.contactNumber.value;

    // create unix timestamp from date and starteTime
    let timeValue = parseInt(moment(`${date}, ${startTime}`, 'MMMM D, YYYY, HH:mm', true).format('x'));

    //format inputted address to geocode-ready format
    let mapAddress = address.split(' ').join('+').replace(/\./g, '');
    let mapCity = city.split(' ').join('+').replace(/\./g, '');
    let mapState = state.split(' ').join('+').replace(/\./g, '');

    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${mapAddress},+${mapCity},+${mapState}&key=AIzaSyBDnrHjFasPDwXmFQ1XUAyt1Q1uAPju8TI`,
      type: 'GET',
      dataType: 'JSON'
    }).done( data => {
      let status = data.status;
      if (status === 'ZERO_RESULTS') {
        Materialize.toast('No results from address. Please submit a valid address', 4000);
      } else if (status === 'OVER_QUERY_LIMIT') {
        Materialize.toast('Cannot make anymore google API calls', 4000);
      } else if (status === 'REQUEST_DENIED') {
        Materialize.toast('Request Denied', 4000);
      } else if (status === 'INVALID_REQUEST') {
        Materialize.toast('Missing address fields', 4000);
      } else if (status === 'UNKNOWN_ERROR') {
        Materialize.toast('Oops something went wrong', 4000);
      } else {
        let lat = data.results[0].geometry.location.lat;
        let lng = data.results[0].geometry.location.lng;
        this.props.dispatch(addEvent(title, primCategory, primSubCategory,
          secCategory, secSubCategory, locationName,
          address, city, state, description,
          date, startTime, endTime, timeValue,
          url, host, contactEmail, contactNumber, lat, lng));
        this.refs.form.reset();
      }
    }).fail(data => {
      Materialize.toast('Uh, oh! There was a problem.', 4000);
      console.log('google geocode problem', data);
    });
  }

  render() {
    let categories = this.state.categories;
    let categorySelect = [];
    let rando = Math.floor(Math.random() * 1000000000);

    for(let parentCat in categories) {
      let subCat = categories[parentCat].map( cat => {
        return(<option key={`${cat}-${rando}`} value={`${parentCat},${cat}`}>{cat}</option>);
      });

      categorySelect.push(
        <optgroup key={`${parentCat}-${rando}`} label={parentCat}>
          {subCat}
        </optgroup>
      );
    }

    let styles = {
      fontWeight: {fontWeight: '300'},
      title: {fontSize: '30px', margin: '20px 0 20px'},
      formBackground: {backgroundColor: 'rgba(128, 128, 128, 0.09)', borderRadius: '15px', padding: '20px'},
      submitButton: {margin: '10px 0px 20px 0px', backgroundColor: '#2C3E50'},
      iconMargin: {marginRight: '5px'},
      clockLabel: {color: '#2980B9'}
    };

    return(
      <div className="container" style={styles.fontWeight}>
        <div style={styles.title}>Add Event</div>
        <form className='row' ref='form' onSubmit={this.addEvent} style={styles.formBackground}>
          <div className='input-field col s12'>
            <input className='validate' type="text" ref="title" required />
            <label style={{position: '12px 0px 32px 0px'}}>Title (Required)</label>
          </div>
          <div className="input-field col s12">
            <select ref="primaryCategory">
              <option defaultValue="" disabled selected>Choose your option</option>
              {categorySelect}
            </select>
            <label>Primary Category</label>
          </div>
          <div className="input-field col s12">
            <select ref="secondaryCategory">
              <option defaultValue="" disabled selected="selected">Choose your option</option>
              {categorySelect}
            </select>
            <label>Secondary Category</label>
          </div>
          <div className='input-field col s12'>
            <input type="text" ref="locationName" className='validate' required />
            <label>Location Name (Required)</label>
          </div>
          <div className='input-field col s12'>
            <input type="text" ref="address" className='validate' required />
            <label>Address (Required)</label>
          </div>
          <div className='input-field col s12'>
            <input type="text" ref="city" className='validate' required />
            <label>City (Required)</label>
          </div>
          <div className='input-field col s12'>
            <input type="text" ref="state" className='validate' required />
            <label>State (Required)</label>
          </div>
          <div className="input-field col s12">
            <textarea type='text' ref="description" id="description" className="materialize-textarea" maxLength="2000"></textarea>
            <label htmlFor="description">Description</label>
          </div>
          <div className='input-field col s12'>
            <input type="date" ref="date" id="date" className="datepicker validate"  />
            <label htmlFor="date"><FaCalendar style={styles.iconMargin}/>Date</label>
          </div>
          <div className='col s12'>
            <label style={styles.clockLabel} htmlFor="startTime"><FaClock style={styles.iconMargin}/>Start Time</label>
            <input type="time" ref="startTime" id="startTime" />
          </div>
          <div className='col s12'>
            <label style={styles.clockLabel} htmlFor="endTime"><FaClock style={styles.iconMargin}/>End Time</label>
            <input type="time" ref="endTime" id="endTime" />
          </div>
          <div className='input-field col s12'>
            <input type="text" ref="host" className='validate' />
            <label><FaUser style={styles.iconMargin}/>Host</label>
          </div>
          <div className='input-field col s12'>
            <input type="email" ref="contactEmail" className='validate' />
            <label><FaEnvelope style={styles.iconMargin} />Contact Email</label>
          </div>
          <div className='input-field col s12'>
            <input type="tel" ref="contactNumber" className='validate' />
            <label><FaPhone style={styles.iconMargin} />Contact Phone</label>
          </div>
          <div className='input-field col s12'>
            <input type="url" ref="url" className='validate'/>
            <label><FaGlobe style={styles.iconMargin} />URL for Event</label>
          </div>
          <div className='center'>
            <button className='btn center waves-effect waves-light' style={styles.submitButton} type="submit">Create Event</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(AddEvent);
