import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/userauth';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.links = this.links.bind(this);
    this.viewChange = this.viewChange.bind(this);
  }

  componentDidMount() {
    window.jQuery('.button-collapse').sideNav({
      closeOnClick: true
    });
  }

  links() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <li><Link to="/add-event">Add Event</Link></li>
          <li><a onClick={() => this.props.dispatch(logout())}>Logout</a></li>
        </div>
      );
    } else {
      return (
        <div>
          <li><Link to="/add-event">Add Event</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </div>
      );
    }
  }

  viewChange() {
    let mapDisplay = this.props.view.mapDisplay;
    let listDisplay;
    let icon;
    if(mapDisplay === 'block') {
      mapDisplay = 'none';
      listDisplay = 'block';
      icon = 'map';
    } else {
      mapDisplay = 'block';
      listDisplay = 'none';
      icon = 'view_list'
    }
    this.props.dispatch({type: 'VIEW_CHANGE', mapDisplay, listDisplay, icon})
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo center">The Haps</Link>
          <a href="#" data-activates="mobile" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
          <span className="right" onClick={this.viewChange} style={{cursor: 'pointer'}}><i style={{fontSize: '2.7rem'}} className="material-icons">{this.props.view.icon}</i></span>
          <ul className="side-nav" id="mobile">
            <li><Link to="/about">About</Link></li>
            <li className="divider"></li>
            <li><Link to="/">Map</Link></li>
            {this.links()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, view: state.view };
};

export default connect(mapStateToProps)(NavBar);
