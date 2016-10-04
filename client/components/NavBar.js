import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/userauth';
import FaBars from 'react-icons/lib/fa/bars';
import FaList from 'react-icons/lib/fa/th-list';
import FaMap from 'react-icons/lib/fa/map-o';

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
    let styles = {
      fontWeight: {fontWeight: '300'}
    };

    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <li><Link to="/add-event" style={styles.fontWeight}>Add Event</Link></li>
          <li><a onClick={() => this.props.dispatch(logout())} style={styles.fontWeight}>Logout</a></li>
        </div>
      );
    } else {
      return (
        <div>
          <li><Link to="/add-event" style={styles.fontWeight}>Add Event</Link></li>
          <li><Link to="/login" style={styles.fontWeight}>Login</Link></li>
          <li><Link to="/signup" style={styles.fontWeight}  >Sign Up</Link></li>
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
      icon = 'view_list';
    }
    this.props.dispatch({type: 'VIEW_CHANGE', mapDisplay, listDisplay, icon});
  }

  render() {
    let styles = {
      viewIcons: {paddingRight: '5px', cursor: 'pointer'},
      fontWeight: {fontWeight: '300'},
      logo: {height: '50px'}
    };

    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo center"><img src="/images/logo/the-haps-white-small.png" className="valign" style={styles.logo}/></Link>
          <a href="#" data-activates="mobile" className="button-collapse show-on-large">
            <FaBars size={'2rem'} />
          </a>
          <span style={styles.viewIcons} className="right" onClick={this.viewChange}>
            {this.props.view.icon === 'map' ? <FaMap size={'1.8rem'} /> : <FaList size={'1.8rem'} />}
          </span>
          <ul className="side-nav" id="mobile">
            <li><Link to="/about" style={styles.fontWeight}>About</Link></li>
            <li className="divider"></li>
            <li><Link to="/" style={styles.fontWeight}>Map</Link></li>
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
