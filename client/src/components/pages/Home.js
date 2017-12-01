import querystring from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { Col, Panel, Button, PageHeader } from 'react-bootstrap';
import TextInput from './../generic/TextInput';
import ExpensesDisplay from './../custom/ExpensesDisplay';
import { makeApiGet } from '../../scripts/fetch';

const { error } = console;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseName: '',
      expenseAmount: '',
    }

    this.handleExpenseName = this.handleExpenseName.bind(this);
    this.handleExpenseAmount = this.handleExpenseAmount.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  handleExpenseName(e) { this.setState({ expenseName: e.target.value }); }
  handleExpenseAmount(e) { this.setState({ expenseAmount: e.target.value }); }
  submitExpense() {
    const query = querystring.stringify({
      name: this.state.expenseName,
      cost: this.state.expenseAmount,
    });
    const target = (`newExpense/?${query}`);
    makeApiGet(target)
      .then((res) => {
        res.json().then((data) => {
          if (data.error) return error(data.error);
          this.props.dispatch({
            type: 'UPDATE_EXPENSE',
            expense: data.expense,
          });
        });
      })
      .catch(err => error(err));
  }

  render() {
    return (
      <div>
        <PageHeader>Track Your Monthly Expense</PageHeader>
        <Col xs={8}>
          <ExpensesDisplay />
        </Col>
        <Col xs={4}>
          <Panel onKeyUp={(e) => {
            if (e.key === 'Enter') this.submitExpense();
          }}>
            <h4>Add an Expense</h4>
            <TextInput
              title='Name'
              type='text'
              placeholder='Name of expense'
              value={this.state.expenseName}
              updateValue={this.handleExpenseName}
            />
            <br/>
            <TextInput
              title='Amount ($/Month)'
              type='number'
              placeholder='$/Month'
              value={this.state.expenseAmount}
              updateValue={this.handleExpenseAmount}
            />
            <hr/>
            <Button
              bsStyle='primary'
              onClick={this.submitExpense}
            >
            Submit Expense
            </Button>
          </Panel>
        </Col>
      </div>
    );
  }
}

export default connect()(Home);
