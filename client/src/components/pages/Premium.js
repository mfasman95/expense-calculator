import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button } from 'react-bootstrap';
import { makeApiGet } from './../../scripts/fetch';

const { error } = console;

class Premium extends React.Component {
  constructor(props) {
    super(props);

    this.updatePremium = this.updatePremium.bind(this);
  }

  updatePremium(premiumState) {
    makeApiGet(`updatePremium/?hasPremium=${premiumState}`)
      .then(res => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        this.props.dispatch({
          type: 'UPDATE_PREMIUM',
          hasPremium: data.hasPremium,
        });
      })
      .catch(err => error(err));
  }

  render() {
    return (
      <div>
        <PageHeader>Premium</PageHeader>
        {
          this.props.hasPremium ?
            // Handle if premium is unlocked
            <Button
              bsStyle='danger'
              bsSize='large'
              onClick={() => this.updatePremium(false)}
            >
              Lock Premium Features (Demo Only)
            </Button> :
            // Handle if premium is locked
            <Button
              bsStyle='success'
              bsSize='large'
              onClick={() => this.updatePremium(true)}
            >
              Unlock Premium Features ($Free.99)
            </Button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    hasPremium: state.session.hasPremium,
  }
};

export default connect(mapStateToProps)(Premium);
