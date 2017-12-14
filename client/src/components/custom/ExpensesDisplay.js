import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, Table, Button } from 'react-bootstrap';
import { makeApiGet } from './../../scripts/fetch';

const Expense = connect()((props) => (
  <tr>
    <td>
      <Button
        bsStyle='danger'
        onClick={() => {
          makeApiGet(`deleteExpense/?expenseId=${props.expense._id}`)
            .then(res => res.json())
            .then((data) => {
              if (data.error) throw data.error;
              
              props.dispatch({
                type: 'DELETE_EXPENSE',
                expenseId: data.expenseId,
              });
            })
            .catch(err => this.context.notify('deleteExpenseError', err));
          }
        }
      >
        <i className='fa fa-times-circle'/>
      </Button>
    </td>
    <td>{props.expense.name}</td>
    <td>${props.expense[props.durationView].toFixed(2)}/{props.durationView}</td>
  </tr>
));

class ExpensesDisplay extends React.Component {
  componentDidMount() {
    makeApiGet(`expenses/?`)
      .then(res => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        this.props.dispatch({
          type: 'INIT_EXPENSES',
          expenses: data.expenses,
        });
      })
      .catch(err => this.context.notify('getExpensesError', err));
  }
  render() {
    let totalExpenses = 0;
    const expenses = [];
    const expenseKeys = Object.keys(this.props.expenses);
    for (let i = 0; i < expenseKeys.length; i++) {
      const expense = this.props.expenses[expenseKeys[i]];
      totalExpenses += expense[this.props.durationView];
      expenses.push(<Expense key={i} expense={expense} durationView={this.props.durationView} />);
    }
    
    return (
      <Panel>
        { (totalExpenses >  0) && <h3 className='text-success'><b>You're Spending ${totalExpenses.toFixed(2)} {(this.props.durationView.charAt(0).toUpperCase() + this.props.durationView.slice(1))}</b></h3> }
        {
          (expenseKeys.length <= 0) ?
            // Handle no expenses
            <h3><b>You Have No Listed Expenses</b></h3> :
            // Display expenses
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {expenses}
              </tbody>
            </Table>
        }
      </Panel>
    );
  }
}

ExpensesDisplay.contextTypes = {
  notify: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  return {
    expenses: state.expenses.expenses,
    durationView: state.expenses.durationView,
  }
}

export default connect(mapStateToProps)(ExpensesDisplay);
