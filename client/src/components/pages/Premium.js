import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageHeader, Button } from 'react-bootstrap';
import { makeApiGet } from './../../scripts/fetch';

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
      .catch(err => this.context.notify('updatePremiumError', err));
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

Premium.contextTypes = {
  notify: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  return {
    hasPremium: state.session.hasPremium,
  }
};

export default connect(mapStateToProps)(Premium);
