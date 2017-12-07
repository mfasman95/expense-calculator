import React from 'react';
import { connect } from 'react-redux';
import { Panel, Table } from 'react-bootstrap';
import { makeApiGet } from './../../scripts/fetch';

const { error } = console;

class BudgetDisplay extends React.Component {
  componentDidMount() {
    makeApiGet(`getBudget/?`)
      .then(res => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        this.props.dispatch({
          type: 'UPDATE_BUDGET',
          budget: data.budget || 0,
        });
      })
      .catch(err => error(err));
  }
  render() {
    const expenseKeys = Object.keys(this.props.expenses);
    let totalExpenses = 0;
    for (let i = 0; i < expenseKeys.length; i++) {
      totalExpenses += this.props.expenses[expenseKeys[i]].costPerMonth;
    }
    
    return (
      <Panel>
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Budget</td>
              <td>${this.props.budget}/month</td>
            </tr>
            <tr>
              <td>Expenses</td>
              <td>${totalExpenses}/month</td>
            </tr>
            <tr className={(this.props.budget - totalExpenses >= 0) ? 'success' : 'danger'}>
              <td>Remaining</td>
              <td>${this.props.budget - totalExpenses}/month</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    expenses: state.expenses.expenses,
    budget: state.expenses.budget,
  }
}

export default connect(mapStateToProps)(BudgetDisplay);
