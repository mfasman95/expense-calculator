import querystring from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import TextInput from './../generic/TextInput';
import { makeApiGet } from '../../scripts/fetch';

const { error } = console;

class UpdateBudget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      budgetAmount: '',
    }

    this.handleBudgetAmount = this.handleBudgetAmount.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
  }

  handleBudgetAmount(e) { this.setState({ budgetAmount: e.target.value }); }
  updateBudget() {
    const query = querystring.stringify({
      budget: this.state.budgetAmount,
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
          title='Amount ($/Month)'
          type='number'
          placeholder='$/Month'
          value={this.state.budgetAmount}
          updateValue={this.handleBudgetAmount}
        />
        <hr/>
        <Button
          bsStyle='primary'
          onClick={this.updateBudget}
        >
        Submit Expense
        </Button>
      </Panel>
    );
  }
}

export default connect()(UpdateBudget);
