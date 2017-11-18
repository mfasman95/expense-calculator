import React from 'react';
import { connect } from 'react-redux';
import { Navbar, ButtonGroup, Button, FormGroup } from 'react-bootstrap';

class MainNav extends React.Component {
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
              <Button bsStyle='danger' onClick={() => console.log('Logout')}>
                Logout
              </Button>
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
  }
};

export default connect(mapStateToProps)(MainNav);
