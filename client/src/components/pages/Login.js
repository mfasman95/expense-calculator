import querystring from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import TextInput from './../generic/TextInput';
import { makeApiGet } from './../../scripts/fetch';
import { Button, PageHeader } from 'react-bootstrap';

const { error } = console;

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.login = this.login.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleUsername(e) { this.setState({ username: e.target.value }); }
  handlePassword(e) { this.setState({ password: e.target.value }); }

  handleEnter(e) { if (e.key === 'Enter') this.login(); }

  login() {
    const query = querystring.stringify({
      username: this.state.username,
      password: this.state.password,
    });
    const target = (`login/?${query}`);
    makeApiGet(target)
      .then((res) => {
        res.json().then((data) => {
          if (data.error) return error(data.error);
          this.props.dispatch({
            type: 'LOGIN',
            username: data.account.username,
            id: data.account._id,
          });
          this.props.dispatch({ type: 'CHANGE_PAGE', page: 'Home' });
        });
      })
      .catch(err => error(err));
  }

  componentDidMount() {
    document.querySelector('input').focus();
  }

  render() {
    return (
      <div onKeyUp={this.handleEnter}>
        <PageHeader>Login</PageHeader>
        <TextInput
          title='Username'
          type='text'
          placeholder='Username goes here'
          value={this.state.username}
          updateValue={this.handleUsername}
        />
        <br/>
        <TextInput
          title='Password'
          type='password'
          placeholder='Password goes here'
          value={this.state.password}
          updateValue={this.handlePassword}
        />
        <hr/>
        <Button
          bsStyle='success'
          bsSize='large'
          onClick={this.login}
          disabled={(this.state.password.length <= 0) || (this.state.username.length <= 0)}
        >
          Login
        </Button>
      </div>
    );
  }
}

export default connect()(Login);
