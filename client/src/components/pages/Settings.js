import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageHeader, Panel, Accordion, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import TextInput from './../generic/TextInput';
import { makeApiGet } from './../../scripts/fetch';

const ChangePasswordTab = (props) => (
  <Panel 
    collapsible
    expanded={props.open}
    header={<h4>Change Password</h4>}
    bsStyle='primary'
    onClick={props.onClick}
    onKeyUp={(e) => {
      if (e.key === 'Enter') props.submitNewPassword();
    }}
  >
    <TextInput
      title='Old Password'
      type='text'
      placeholder='Old password goes here'
      value={props.oldPass}
      updateValue={props.handleOldPass}
    />
    <br/>
    <TextInput
      title='New Password'
      type='password'
      placeholder='New password goes here'
      value={props.newPass1}
      updateValue={props.handleNewPass1}
    />
    <br/>
    <TextInput
      title='Confirm New Password'
      type='password'
      placeholder='Repeat your new password'
      value={props.newPass2}
      updateValue={props.handleNewPass2}
    />
    <br/>
    {
      props.newPass1.length > 0 && (props.newPass1 === props.newPass2) &&
          <h4 className='text-success'>New Passwords Match</h4>
    }
    {
      props.newPass1.length > 0 && (props.newPass1 !== props.newPass2) &&
        <h4 className='text-danger'>New Passwords Do Not Match</h4>
    }
    <hr/>
    <Button
      bsStyle='success'
      bsSize='large'
      onClick={props.submitNewPassword}
      disabled={
        (props.oldPass.length <= 0) ||
        (props.newPass1.length <= 0) ||
        (props.newPass1 !== props.newPass2)
      }
    >
      Change Password
    </Button>
  </Panel>
);

const themes = ['default', 'cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'lumen', 'paper', 'readable', 'sandstone', 'simplex', 'slate', 'spacelab', 'superhero', 'united', 'yeti'];
const ChangeThemeTab = (props) => (
  <Panel 
    collapsible
    expanded={props.open}
    header={<h4>Change Theme</h4>}
    bsStyle='primary'
    onClick={props.onClick}
  >
    <DropdownButton bsStyle='info' title={`Set Theme (${props.theme.charAt(0).toUpperCase()}${props.theme.slice(1)})`} id={'theme-dropdown'}>
      {themes.map((theme, i) => (
        <MenuItem eventKey={`${i}`} onClick={()=>props.handleTheme(theme)} key={i}>
          {`${theme.charAt(0).toUpperCase()}${theme.slice(1)}`}
        </MenuItem>
      ))}
    </DropdownButton>
  </Panel>
);

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openTab: 'changePassword',
      oldPass: '',
      newPass1: '',
      newPass2: '',
    }

    this.handleSettingTabs = this.handleSettingTabs.bind(this);
    this.handleOldPass = this.handleOldPass.bind(this);
    this.handleNewPass1 = this.handleNewPass1.bind(this);
    this.handleNewPass2 = this.handleNewPass2.bind(this);
    this.submitNewPassword = this.submitNewPassword.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
  }

  handleSettingTabs(openTab) {
    this.setState({ openTab });
  }

  handleOldPass(e) { this.setState({ oldPass: e.target.value }); }
  handleNewPass1(e) { this.setState({ newPass1: e.target.value }); }
  handleNewPass2(e) { this.setState({ newPass2: e.target.value }); }
  submitNewPassword() {
    const query = querystring.stringify({
      oldPass: this.state.oldPass,
      newPass1: this.state.newPass1,
      newPass2: this.state.newPass2,
    });
    const target = (`changePassword/?${query}`);
    makeApiGet(target)
      .then(res => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        this.context.notify('changePasswordSuccess', 'You have succesfully changed your password');
      })
      .catch(err => this.context.notify('changePasswordError', err));

    this.setState({ oldPass: '', newPass1: '', newPass2: '' });
  }

  handleTheme(theme) {
    this.props.dispatch({ type: 'SET_THEME', theme })
  }

  render() {
    return (
      <div>
        <PageHeader>Settings</PageHeader>
        <Accordion>
          <ChangePasswordTab
            open={this.state.openTab === 'changePassword'}
            onClick={()=>this.handleSettingTabs('changePassword')}
            oldPass={this.state.oldPass}
            handleOldPass={this.handleOldPass}
            newPass1={this.state.newPass1}
            handleNewPass1={this.handleNewPass1}
            newPass2={this.state.newPass2}
            handleNewPass2={this.handleNewPass2}
            submitNewPassword={this.submitNewPassword}
          />
          <ChangeThemeTab
            open={this.state.openTab === 'changeTheme'}
            onClick={()=>this.handleSettingTabs('changeTheme')}
            theme={this.props.theme}
            handleTheme={this.handleTheme}
          />
        </Accordion>
      </div>
    );
  }
}

Settings.contextTypes = {
  notify: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({ 
  theme: state.main.theme,
})

export default connect(mapStateToProps)(Settings);
