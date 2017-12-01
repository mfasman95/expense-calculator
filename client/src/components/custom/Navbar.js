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
    makeApiGet(`logout/?`)
      .then((res) => res.json().then(() => this.props.dispatch({ type: 'LOGOUT' })))
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
                this.props.loggedIn && this.props.page !== 'Settings' &&
                  <Button bsStyle='primary' onClick={() => this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Settings' })}>
                    <i className='fa fa-cog' />
                  </Button>
              }
              {
                this.props.loggedIn && this.props.page !== 'Home' &&
                  <Button bsStyle='primary' onClick={() => this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Home' })}>
                    <i className='fa fa-home' />
                  </Button>
              }
              {
                this.props.loggedIn && this.props.page !== 'Premium' &&
                  <Button bsStyle='success' onClick={() => this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Premium' })}>
                    <i className='fa fa-dollar' />
                  </Button>
              }
              {
                this.props.loggedIn && 
                  <Button bsStyle='danger' onClick={this.logout}>
                    <i className='fa fa-sign-out' />
                  </Button>
              }
              {
                !this.props.loggedIn && this.props.page !== 'Signup' &&
                  <Button bsStyle='primary' onClick={() => this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Signup' })}>
                    <i className='fa fa-user-plus' />
                  </Button>
              }
              {
                !this.props.loggedIn && this.props.page !== 'Login' &&
                  <Button bsStyle='primary' onClick={() => this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Login' })}>
                    <i className='fa fa-sign-in' />
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
