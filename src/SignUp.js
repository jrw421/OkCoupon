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
      <div className="container" style={{width: "50%", marginLeft: "auto", marginRight:"auto"}}>

      <form className="form-signin">
      <h3>Sign-Up</h3>
        <input type="username" style={{'margin-bottom': '-1px', 'border-bottom-right-radius': '0', 'border-bottom-left-radius': '0'}} className="form-control" onChange={this.handleInputChangeUserName.bind(this)} value={this.state.user_name} type="text" placeholder="username"></input>
        <input type="password" style={{'margin-bottom': '10px', 'border-top-left-radius': '0', 'border-top-right-radius': '0'}} className="form-control" onChange={this.handleInputChangePassword.bind(this)} value={this.state.password} type="text" placeholder="password"></input>
        {this.state.errorHidden === false ? <div id="signupError">Invalid username/password. Please try again.</div> : null}
        {this.state.userTaken ? <div id="signupError">Username already taken.<br/>Please try again with a different username.</div> : null}
        <button className="btn btn-lg btn-primary btn-block" onClick={this.handleInputClick.bind(this)}>Sign Up</button>

      </form>

      </div>
      )
    }
  }

export default SignUp
