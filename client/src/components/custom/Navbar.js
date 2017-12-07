import React from 'react';
import { connect } from 'react-redux';
import { Navbar, ButtonGroup, Button, FormGroup } from 'react-bootstrap';
import { makeApiGet } from './../../scripts/fetch'

const { error } = console;

const NavIconButton = (props) => (
  <Button
    bsStyle={props.bsStyle}
    disabled={props.disabled || false}
    onClick={props.onClick}
  >
    <i className={`fa fa-${props.icon}`}/>
  </Button>
);

class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  logout() {
    makeApiGet(`logout/?`)
      .then((res) => res.json())
      .then(() => this.props.dispatch({ type: 'LOGOUT' }))
      .catch(err => error(err));
  }

  changePage(page) {
    this.props.dispatch({
      type: 'CHANGE_PAGE',
      page,
    });
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
                  <NavIconButton
                    bsStyle='primary'
                    disabled={this.props.page === 'Home'}
                    onClick={() => this.changePage('Home')}
                    icon='home'
                  />
              }
              {
                this.props.loggedIn &&
                  <NavIconButton
                    bsStyle='primary'
                    disabled={this.props.page === 'Settings'}
                    onClick={() => this.changePage('Settings')}
                    icon='cog'
                  />
              }
              {
                this.props.loggedIn &&
                  <NavIconButton
                    bsStyle='success'
                    disabled={this.props.page === 'Premium'}
                    onClick={() => this.changePage('Premium')}
                    icon='dollar'
                  />
              }
              {
                this.props.loggedIn && 
                  <NavIconButton
                    bsStyle='danger'
                    onClick={this.logout}
                    icon='sign-out'
                  />
              }
              {
                !this.props.loggedIn && this.props.page !== 'Signup' &&
                  <NavIconButton
                    bsStyle='primary'
                    onClick={() => this.changePage('Signup')}
                    icon='user-plus'
                  />
              }
              {
                !this.props.loggedIn && this.props.page !== 'Login' &&
                  <NavIconButton
                    bsStyle='primary'
                    onClick={() => this.changePage('Login')}
                    icon='sign-in'
                  /> 
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
