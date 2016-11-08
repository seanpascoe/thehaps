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
    this.navbarViewChangeMap = this.navbarViewChangeMap.bind(this);
    this.navbarViewChangeList = this.navbarViewChangeList.bind(this);
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
    let mapDisplay = this.props.view.mapDisplay;
    let listDisplay;
    let icon;
    if(mapDisplay === 'block') {
      window.jQuery('#listcontainer').show();
      window.jQuery('#g-map').hide();    
      mapDisplay = 'none';
      listDisplay = 'block';
      icon = 'map';
    } else {
      window.jQuery('#g-map').show();
      window.jQuery('#listcontainer').hide();
      mapDisplay = 'block';
      listDisplay = 'none';
      icon = 'view_list';
      this.props.dispatch({type: 'TRIGGER_MAP', mapRefreshTrigger: true});
    }
    this.props.dispatch({type: 'VIEW_CHANGE', mapDisplay, listDisplay, icon});
  }

  navbarViewChangeMap() {
    window.jQuery('#g-map').show();
    window.jQuery('#listcontainer').hide();
    let mapDisplay = 'block';
    let listDisplay = 'none';
    let icon = 'view_list';
    this.props.dispatch({type: 'VIEW_CHANGE', mapDisplay, listDisplay, icon});
  }

  navbarViewChangeList() {
    window.jQuery('#listcontainer').show();
    window.jQuery('#g-map').hide();
    let mapDisplay = 'none';
    let listDisplay = 'block';
    let icon = 'map';
    this.props.dispatch({type: 'VIEW_CHANGE', mapDisplay, listDisplay, icon});
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
            <li><Link to="/contact" style={styles.fontWeight}><FaInfo size={'26px'} /><span className="menu-item">Contact</span></Link></li>
            <li className="divider" style={{margin: 0}}></li>
            <li
              onClick={() => {
                this.navbarViewChangeMap();
                this.props.dispatch({type: 'TRIGGER_MAP', mapRefreshTrigger: true});
              }}>
              <Link to="/" style={styles.fontWeight}><FaMap size={'26px'} /><span className="menu-item">Map View</span></Link></li>
            <li onClick={this.navbarViewChangeList}><Link to="/" style={styles.fontWeight}><FaList size={'26px'} /><span className="menu-item">List View</span></Link></li>
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
