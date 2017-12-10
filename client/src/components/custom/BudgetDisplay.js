import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, Table } from 'react-bootstrap';
import { makeApiGet } from './../../scripts/fetch';

class BudgetDisplay extends React.Component {
  componentDidMount() {
    makeApiGet(`getBudget/?`)
      .then(res => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        this.props.dispatch({
          type: 'UPDATE_BUDGET',
          budget: data.budget || {
            daily: 0,
            weekly: 0,
            monthly: 0,
            yearly: 0,
          },
        });
      })
      .catch(err => this.context.notify('getBudgetError', err));
  }
  render() {
    const expenseKeys = Object.keys(this.props.expenses);
    let totalExpenses = 0;
    for (let i = 0; i < expenseKeys.length; i++) {
      const expense = this.props.expenses[expenseKeys[i]];
      totalExpenses += expense[this.props.durationView];
    }
    const budget = this.props.budget[this.props.durationView];

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
              <td>${budget.toFixed(2)}/month</td>
            </tr>
            <tr>
              <td>Expenses</td>
              <td>${totalExpenses.toFixed(2)}/month</td>
            </tr>
            <tr className={(budget - totalExpenses >= 0) ? 'success' : 'danger'}>
              <td>Remaining</td>
              <td>${(budget - totalExpenses).toFixed(2)}/month</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}

BudgetDisplay.contextTypes = {
  notify: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  return {
    expenses: state.expenses.expenses,
    budget: state.expenses.budget,
    durationView: state.expenses.durationView,
  }
}

export default connect(mapStateToProps)(BudgetDisplay);
