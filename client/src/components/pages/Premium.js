import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button } from 'react-bootstrap';

class Premium extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Premium</PageHeader>
        <Button
          bsStyle='success'
          bsSize='large'
          disabled={true}
        >
          Unlock Premium Features ($4.99)
        </Button>
      </div>
    );
  }
}

export default connect()(Premium);
