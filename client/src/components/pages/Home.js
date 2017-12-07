import React from 'react';
import { connect } from 'react-redux';
import { Col, PageHeader, Row, Well } from 'react-bootstrap';
import UpdateBudget from './../custom/UpdateBudget';
import BudgetDisplay from './../custom/BudgetDisplay';
import ExpensesDisplay from './../custom/ExpensesDisplay';
import SubmitExpense from './../custom/SubmitExpense';

class Home extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Track Your Monthly Expense</PageHeader>
        {
          this.props.hasPremium &&
            <Well>
              <h3><b>Budget</b></h3>
              <hr/>
              <Row>
                <Col xs={12} md={4}>
                  <UpdateBudget />
                </Col>
                <Col xs={12} md={8}>
                  <BudgetDisplay />
                </Col>
              </Row>
            </Well>
        }
        <Well>
          <h3><b>Expenses</b></h3>
          <hr/>
          <Row>
            <Col xs={12} md={4}>
              <SubmitExpense />
            </Col>
            <Col xs={12} md={8}>
              <ExpensesDisplay />
            </Col>
          </Row>
        </Well>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    hasPremium: state.session.hasPremium,
  }
};

export default connect(mapStateToProps)(Home);
