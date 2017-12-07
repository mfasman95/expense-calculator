import React from 'react';
import { connect } from 'react-redux';
import { Panel, Table, Button } from 'react-bootstrap';
import { makeApiGet } from './../../scripts/fetch';

const { error } = console;

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
            .catch(err => error(err));
          }
        }
      >
        <i className='fa fa-times-circle'/>
      </Button>
    </td>
    <td>{props.expense.name}</td>
    <td>${props.expense.costPerMonth}/Month</td>
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
      .catch(err => error(err));
  }
  render() {
    const expenseKeys = Object.keys(this.props.expenses);
    let totalExpenses = 0;
    const expenses = [];
    for (let i = 0; i < expenseKeys.length; i++) {
      const expense = this.props.expenses[expenseKeys[i]];

      totalExpenses += expense.costPerMonth;
      expenses.push(<Expense key={i} expense={expense} />);
    }
    
    return (
      <Panel>
        { (totalExpenses >  0) && <h3 className='text-success'><b>You're Spending ${totalExpenses}/Month</b></h3> }
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

const mapStateToProps = (state, ownProps) => {
  return {
    expenses: state.expenses.expenses,
  }
}

export default connect(mapStateToProps)(ExpensesDisplay);
