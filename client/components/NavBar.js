import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/userauth';
import FaBars from 'react-icons/lib/fa/bars';
import FaList from 'react-icons/lib/fa/th-list';
import FaMap from 'react-icons/lib/fa/map-o';
import FaPlus from 'react-icons/lib/fa/plus-circle';
import FaSignIn from 'react-icons/lib/fa/sign-in';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import FaSignUp from 'react-icons/lib/fa/user-plus';
import FaInfo from 'react-icons/lib/fa/info-circle';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.links = this.links.bind(this);
    this.viewChange = this.viewChange.bind(this);
  }

  componentDidMount() {
    window.jQuery('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: false
    });
  }

  links() {
    let styles = {
      fontWeight: {fontWeight: '300'}
    };

    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <li><Link to="/add-event" style={styles.fontWeight}><FaPlus size={'26px'} /><span className="menu-item">Add Event</span></Link></li>
          <li><a onClick={() => this.props.dispatch(logout())} style={styles.fontWeight}><FaSignOut size={'26px'} /><span className="menu-item">Logout</span></a></li>
        </div>
      );
    } else {
      return (
        <div>
          <li><Link to="/add-event" style={styles.fontWeight}><FaPlus size={'26px'} /><span className="menu-item">Add Event</span></Link></li>
          <li><Link to="/login" style={styles.fontWeight}><FaSignIn size={'26px'} /><span className="menu-item">Login</span></Link></li>
          <li><Link to="/signup" style={styles.fontWeight}><FaSignUp size={'26px'} /><span className="menu-item">Sign Up</span></Link></li>
        </div>
      );
    }
  }

  viewChange() {
    let icon = this.props.view.icon;
    window.jQuery('#g-map').toggle();
    window.jQuery('#listcontainer').toggle();
    if(icon === 'view_list') {
      icon = 'map';
    } else {
      icon = 'view_list';
    }
    this.props.dispatch({type: 'VIEW_CHANGE', icon});
  }

  render() {
    let styles = {
      viewIcons: {cursor: 'pointer'},
      fontWeight: {fontWeight: '300'},
      logo: {height: '38px'},
      navBarColor: {backgroundColor: '#2C3E50'}
    };

    return (
      <div className="navbar-fixed">
        <nav style={styles.navBarColor}>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo center" style={styles.logo}><img src="/images/logo/thehapslogo-white.svg" style={styles.logo}/></Link>
            <a href="#" data-activates="mobile" className="button-collapse show-on-large">
              <FaBars size={'29px'} />
            </a>
            <div style={{cursor: 'pointer', display: this.props.routing.locationBeforeTransitions.pathname === '/' ? 'block' : 'none'}} className="right viewIcon" onClick={this.viewChange}>
              {this.props.view.icon === 'map' ? <FaMap size={'26px'} /> : <FaList size={'26px'} />}
            </div>
            <ul className="side-nav" id="mobile">
              <li>
                <Link to="/contact" style={styles.fontWeight}><FaInfo size={'26px'} /><span className="menu-item">Contact</span></Link>
              </li>
              <li className="divider" style={{margin: 0}}></li>
              <li>
                <Link to="/" style={styles.fontWeight}><FaMap size={'26px'} /><span className="menu-item">Map/List View</span></Link>
              </li>
              {this.links()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, view: state.view, routing: state.routing };
};

export default connect(mapStateToProps)(NavBar);
