import React from 'react';
import { connect } from 'react-redux';
import { Col, PageHeader, Row, Well, Panel } from 'react-bootstrap';
import UpdateBudget from './../custom/UpdateBudget';
import BudgetDisplay from './../custom/BudgetDisplay';
import ExpensesDisplay from './../custom/ExpensesDisplay';
import SubmitExpense from './../custom/SubmitExpense';
import RadioControl from './../generic/RadioControl';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDurationView = this.handleDurationView.bind(this);
  }

  handleDurationView(durationView) { this.props.dispatch({ type: 'SET_DURATION_VIEW', durationView }) };

  render() {
    return (
      <div>
        <PageHeader>Track Your Expense</PageHeader>
        {
          this.props.hasPremium &&
            <div>
              <Panel>
                <RadioControl
                  name='DurationToggle'
                  value={this.props.durationView}
                  onChange={this.handleDurationView}
                  options={['daily', 'weekly', 'monthly', 'yearly']}
                />
              </Panel>
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
            </div>
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
    durationView: state.expenses.durationView,
  }
};

export default connect(mapStateToProps)(Home);
