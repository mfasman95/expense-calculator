import querystring from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import TextInput from './../generic/TextInput';
import RadioControl from './../generic/RadioControl';
import { makeApiGet } from '../../scripts/fetch';

const { error } = console;

class UpdateBudget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      budgetAmount: '',
      duration: 'monthly',
    }

    this.handleBudgetAmount = this.handleBudgetAmount.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
  }

  handleBudgetAmount(e) { this.setState({ budgetAmount: e.target.value }); }
  handleDuration(duration) { this.setState({ duration }); }
  updateBudget() {
    const query = querystring.stringify({
      budget: this.state.budgetAmount,
      duration: this.state.duration,
    });
    const target = (`setBudget/?${query}`);
    makeApiGet(target)
      .then(res => res.json())
      .then((data) => {
        if (data.error) return error(data.error);

        this.props.dispatch({
          type: 'UPDATE_BUDGET',
          budget: data.budget,
        });
      })
      .catch(err => error(err));
  }

  render() {
    return (
      <Panel onKeyUp={(e) => {
        if (e.key === 'Enter') this.updateBudget();
      }}>
        <h4>Set Your Budget</h4>
        <TextInput
          title='Amount'
          type='number'
          placeholder='$/Duration'
          value={this.state.budgetAmount}
          updateValue={this.handleBudgetAmount}
        />
        <br/>
        <RadioControl
          name='DurationToggleBudget'
          value={this.state.duration}
          onChange={this.handleDuration}
          options={['daily', 'weekly', 'monthly', 'yearly']}
        />
        <hr/>
        <Button
          bsStyle='primary'
          onClick={this.updateBudget}
        >
          Update Budget
        </Button>
      </Panel>
    );
  }
}

export default connect()(UpdateBudget);
