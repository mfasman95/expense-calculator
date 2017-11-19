import React from 'react';
import { connect } from 'react-redux';
import { Navbar, ButtonGroup, Button, FormGroup } from 'react-bootstrap';
import { makeApiGet } from './../../scripts/fetch'

const { error } = console;

class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    makeApiGet(`logout`)
      .then((res) => {
        res.json()
          .then((data) => {
            this.props.dispatch({ type: 'LOGOUT' });
            this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Login' });
          });
      })
      .catch(err => error(err));
  }

  render() {
    return (  
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Expense Calculator
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullRight>
          <FormGroup>
            <ButtonGroup>
              {
                this.props.loggedIn && 
                  <Button bsStyle='danger' onClick={this.logout}>
                    Logout
                  </Button>
              }
              {
                !this.props.loggedIn && this.props.page === 'Login' &&
                  <Button bsStyle='primary' onClick={() => this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Signup' })}>
                    Signup
                  </Button>
              }
              {
                !this.props.loggedIn && this.props.page === 'Signup' &&
                  <Button bsStyle='primary' onClick={() => this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Login' })}>
                    Login
                  </Button>  
              }
            </ButtonGroup>
          </FormGroup>
        </Navbar.Form>
      </Navbar>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.main.loggedIn,
    page: state.route.page,
  }
};

export default connect(mapStateToProps)(MainNav);
