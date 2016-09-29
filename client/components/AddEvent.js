import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../actions/event';
import categories from './categories';
import $ from 'jquery';

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
      selectYears: 15, // Creates a dropdown of 15 years to control year
      closeOnSelect: true,
      format: 'mmmm d, yyyy'
    });

    //Option Selector for category
    window.jQuery('select').material_select();
  }

  addEvent(e) {
    e.preventDefault();
    let primaryCategory = this.refs.primaryCategory.value;
    let splitPrimCat = primaryCategory.split(' ');
    let secondaryCategory = this.refs.secondaryCategory.value;
    let splitSecCat = secondaryCategory.split(' ');

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
    let contactNumber = this.refs.contactNumber.value;

    // this returns a Unix Time Value of type string... so should be parseInt before storage
    let timeValue = moment(`${date}, ${startTime}`, 'MMMM D, YYYY, HH:mm', true).format('x');
    timeValue = parseInt(timeValue);

    // getting lat and long from address
    let mapAddress = address.split('+');
    let mapCity = city.split('+');

    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${mapAddress},+${mapCity},+${state}&key=AIzaSyBDnrHjFasPDwXmFQ1XUAyt1Q1uAPju8TI`,
      type: 'GET',
      dataType: 'JSON'
    }).done( data => {
      let lat = data.results[0].geometry.location.lat;
      let lng = data.results[0].geometry.location.lng;
      this.props.dispatch(addEvent(title, primCategory, primSubCategory,
        secCategory, secSubCategory, locationName,
        address, city, state, description,
        date, startTime, endTime, timeValue,
        url, host, contactNumber, lat, lng));
      this.refs.form.reset();
    }).fail(data => {
      Materialize.toast('Uh, oh! There was a problem.', 4000);
    });
  }

  render() {
    let categories = this.state.categories;
    let categorySelect = [];
    let rando = Math.floor(Math.random() * 1000000000);

    for(let parentCat in categories) {
      let subCat = categories[parentCat].map( cat => {
        return(<option key={`${cat}-${rando}`} value={`${parentCat} ${cat}`}>{cat}</option>);
      });

      categorySelect.push(
        <optgroup key={`${parentCat}-${rando}`} label={parentCat}>
          {subCat}
        </optgroup>
      );
    }


    return(
      <div className="container">
        <h2>Add Event</h2>
        <form ref='form' onSubmit={this.addEvent}>
          <input type="text" ref="title" placeholder="Title (Required)" />
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
          <input type="text" ref="locationName" placeholder="Location Name (Required)" />
          <input type="text" ref="address" placeholder="Address (Required)" />
          <input type="text" ref="city" placeholder="City (Required)" />
          <input type="text" ref="state" placeholder="State (Required)" />
          <div className="input-field col s12">
            <textarea ref="description" id="description" className="materialize-textarea" maxLength="2000"></textarea>
            <label htmlFor="description">Description</label>
          </div>
          <input type="date" ref="date" className="datepicker" placeholder="Date" />
          <input type="time" ref="startTime" placeholder="Start Time" />
          <input type="time" ref="endTime" placeholder="End Time" />
          <input type="text" ref="host" placeholder="Host" />
          <input type="tel" ref="contactNumber" placeholder="Contact Phone #"/>
          <input type="url" ref="url" placeholder="URL for Event" />

          <button className='btn' type="submit">Create Event</button>
        </form>
      </div>
    );
  }
}

export default connect()(AddEvent);
