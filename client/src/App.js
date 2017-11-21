import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import './css/App.css';
import Router from './components/generic/Router';
import Pages from './components/pages';
import MainNav from './components/custom/Navbar';

class App extends Component {
  render() {
    return (
      <Row className="App">
        <MainNav />
        <Col xs={10} xsOffset={1}>
          <Router currentPage={this.props.page} pages={Pages} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.route.page,
  }
}

export default connect(mapStateToProps)(App);
