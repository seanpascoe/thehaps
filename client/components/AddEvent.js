import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../actions/event.js';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.addEvent = this.addEvent.bind(this);
    this.state = { categories:{ music: ['rock', 'blues', 'folk'],
                                art: ['art show', 'poetry', 'theatre' ],
                                sports: ['football', 'baseball', 'soccer']
                              }
                 };
  }

  componentDidMount() {
    //Date picker
    window.jQuery('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
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
    let lat = this.refs.lat.value;
    let lng = this.refs.lng.value;
    this.props.dispatch(addEvent(title, primCategory, primSubCategory,
                                 secCategory, secSubCategory, locationName,
                                 address, city, state, description,
                                 date, startTime, endTime,
                                 url, host, contactNumber, lat, lng));
    // this.refs.form.reset();
  }

  render() {
    let categories = this.state.categories
    let categorySelect = []
    let rando = Math.floor(Math.random() * 1000);

    for(let parentCat in categories) {
      let subCat = categories[parentCat].map( cat => {
        return(<option key={`${cat}-${rando}`} value={`${parentCat} ${cat}`}>{cat}</option>)
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
              <option defaultValue="" disabled selected="selected">Choose your option</option>
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
          <textarea type="text" ref="description" placeholder="Description" />
          <input type="date" ref="date" className="datepicker" placeholder="Date" />
          <input type="time" ref="startTime" placeholder="Start Time" />
          <input type="time" ref="endTime" placeholder="End Time" />
          <input type="text" ref="host" placeholder="Host" />
          <input type="tel" ref="contactNumber" placeholder="Contact Phone #"/>
          <input type="text" ref="url" placeholder="URL for Event" />
          <input type="text" ref="lat" placeholder="Lat" />
          <input type="text" ref="lng" placeholder="Lng" />

          <button className='btn' type="submit">Create Event</button>
        </form>
      </div>
    );
  }
}

export default connect()(AddEvent);
