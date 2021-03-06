import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, Button, Row, Col } from 'react-bootstrap';
import TextInput from './../generic/TextInput';
import RadioControl from './../generic/RadioControl';
import { makeApiGet } from '../../scripts/fetch';

class SubmitExpense extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseName: '',
      expenseAmount: 0,
      duration: 'monthly',
    }

    this.handleExpenseName = this.handleExpenseName.bind(this);
    this.handleExpenseAmount = this.handleExpenseAmount.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  handleExpenseName(e) { this.setState({ expenseName: e.target.value }); }
  handleExpenseAmount(e) { this.setState({ expenseAmount: e.target.value }); }
  handleDuration(duration) { this.setState({ duration }); }
  submitExpense() {
    const query = querystring.stringify({
      name: this.state.expenseName,
      cost: this.state.expenseAmount,
      duration: this.state.duration,
    });
    const target = (`newExpense/?${query}`);
    makeApiGet(target)
      .then(res => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        
        this.props.dispatch({
          type: 'UPDATE_EXPENSE',
          expense: data.expense,
        });
      })
      .catch(err => this.context.notify('newExpenseError', err));
    
    this.setState({ expenseName: '', expenseAmount: 0 });
  }

  render() {
    return (
      <Panel onKeyUp={(e) => {
        if (e.key === 'Enter') this.submitExpense();
      }}>
        <h4>Add an Expense</h4>
        <TextInput
          title='Expense Name'
          type='text'
          placeholder='Name of expense'
          value={this.state.expenseName}
          updateValue={this.handleExpenseName}
        />
        <br/>
        <TextInput
          title='Expense Amount'
          type='number'
          placeholder='$/Duration'
          value={this.state.expenseAmount}
          updateValue={this.handleExpenseAmount}
        />
        <br/>
        <Row>
          <Col xs={3}>
            <h4>Time Period:</h4>
          </Col>
          <Col xs={9}>
            <RadioControl
              name='DurationToggleBudget'
              value={this.state.duration}
              onChange={this.handleDuration}
              options={['daily', 'weekly', 'monthly', 'yearly']}
            />
          </Col>
        </Row>
        <hr/>
        <Button
          bsStyle='primary'
          onClick={this.submitExpense}
        >
          Submit Expense
        </Button>
      </Panel>
    );
  }
}

SubmitExpense.contextTypes = {
  notify: PropTypes.func,
}

export default connect()(SubmitExpense);
