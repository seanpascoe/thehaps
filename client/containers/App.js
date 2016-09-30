import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { fetchEvents } from '../actions/event';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let startDate = moment().startOf('day').format('x');
    let endDate = moment().endOf('day').add(3, 'days').format('x');

    this.props.dispatch(fetchEvents(startDate, endDate));

    if (!this.props.auth.isAuthenticated) {
      if (sessionStorage.userId && sessionStorage.token) {
        this.props.dispatch({
          type: 'LOGIN',
          id: sessionStorage.userId,
          token: sessionStorage.token
        });
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
     </div>
     );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(App);
