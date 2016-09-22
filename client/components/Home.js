import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../actions/event.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.addEvent = this.addEvent.bind(this);
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
    let title = this.refs.title.value;
    let category = this.refs.category.value;
    let address = this.refs.address.value;
    let city = this.refs.city.value;
    let state = this.refs.state.value;
    let description = this.refs.description.value;
    let date = this.refs.date.value;
    let startTime = this.refs.startTime.value;
    let endTime = this.refs.endTime.value;
    let url = this.refs.url.value;
    let lat = this.refs.lat.value;
    let lng = this.refs.lng.value;
    this.props.dispatch(addEvent(title, category, address,
                                 city, state, description,
                                 date, startTime, endTime,
                                 url, lat, lng));
    this.refs.form.reset();
  }

  render() {
    return(
      <div className="container">
        <h2>Add Event</h2>
        <form ref='form' onSubmit={this.addEvent}>
          <input type="text" ref="title" placeholder="Title (Required)" />
          <input type="text" ref="address" placeholder="Address (Required)" />
          <input type="text" ref="city" placeholder="City (Required)" />
          <input type="text" ref="state" placeholder="State (Required)" />
          <textarea type="text" ref="description" placeholder="Description" />
          <input type="date" ref="date" className="datepicker" placeholder="Date" />
          <input type="text" ref="startTime" placeholder="Start Time" />
          <input type="text" ref="endTime" placeholder="End Time" />
          <input type="text" ref="url" placeholder="URL for Event" />
          <input type="text" ref="lat" placeholder="Lat" />
          <input type="text" ref="lng" placeholder="Lng" />

          <div className="input-field col s12">
            <select ref="category">
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Food">Food</option>
            </select>
            <label>Category</label>
          </div>
          <button className='btn' type="submit">Create Event</button>
        </form>
      </div>
    );
  }
}

export default connect()(Home);
