import React from 'react';
import Navigation from './route.js'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';
import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_name: '',
      password: '',
      errorHidden: true,
      userTaken: false,
    }
  }

  handleInputChangeUserName(e) {
    this.setState({
      user_name: e.target.value,
      errorHidden: true,
      userTaken: false
    })
  }

  handleInputChangePassword(e) {
    this.setState({
      password: e.target.value,
      errorHidden: true,
      userTaken: false
    })
  }

  handleInputClick(e) {
    if ( this.state.user_name.length > 0 && this.state.password.length > 0 ) {
      e.preventDefault();
      axios.post('/login', {user_name: this.state.user_name, password: this.state.password})
      .then((data) => {
        this.setState({
          userTaken: true
        });
      })
      .catch((err) => {
        console.log('ok to proceed to sign up.');
      });
      axios.post('/signUp', {user_name: this.state.user_name, password: this.state.password})
      .then((res) => {
        this.setState({
          user_name: '',
          password: ''
        })
        console.log('success!')
      });
    } else {
      this.setState({
        errorHidden: false
      });
    }
  }


  render() {
    return (
      <form>
        <input onChange={this.handleInputChangeUserName.bind(this)} value={this.state.user_name} type="text" placeholder="username"></input>
        <input onChange={this.handleInputChangePassword.bind(this)} value={this.state.password} type="text" placeholder="password"></input>
        {this.state.errorHidden === false ? <div id="signupError">Invalid username/password. Please try again.</div> : null}
        {this.state.userTaken ? <div id="signupError">Username already taken.<br/>Please try again with a different username.</div> : null}
        <button onClick={this.handleInputClick.bind(this)}>submit</button>
      </form>
      )
    }
  }

export default SignUp
