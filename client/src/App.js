import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar, showSnack } from 'react-redux-snackbar';
import { Col, Row } from 'react-bootstrap';
import './css/App.css';
import Router from './components/generic/Router';
import Pages from './components/pages';
import MainNav from './components/custom/Navbar';

class App extends Component {
  getChildContext() {
    return {
      notify: (id, notifyText, customTimeout) => {
        return this.props.dispatch(showSnack(id, {
          label: notifyText,
          timeout: customTimeout || 5000,
          button: { label: 'x' },
        }));
      },
    }
  }

  render() {
    return (
      <Row className="App">
        <MainNav />
        <Col xs={10} xsOffset={1}>
          <Router currentPage={this.props.page} pages={Pages} />
        </Col>
        <Snackbar />
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.route.page,
  }
}

App.childContextTypes = {
  notify: PropTypes.func,
}

export default connect(mapStateToProps)(App);
