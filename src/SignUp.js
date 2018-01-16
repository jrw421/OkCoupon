import React from 'react';
import Navigation from './route.js'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';
import axios from 'axios';

//check to see if the username is in the database
  //if true, check the password and see if it matches,
    //then redirect to home page

  //if false, redirect to sign up page

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_name: '',
      password: ''
    }
  }

  handleInputChangeUserName(e) {
    this.setState({
      user_name: e.target.value
    })
  }

  handleInputChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleInputClick(e) {
    console.log("stuff", this.state.user_name, this.state.password)

    axios.post('/newUser', {user_name: this.state.user_name, password: this.state.password})
    .then((res) => {
      console.log('success!')
    })
  }


  render() {
    // {console.log('username ', this.state.user_name)}
    // {console.log('password ', this.state.password)}
    return (
      <form>
        <input onChange={this.handleInputChangeUserName.bind(this)} type="text" placeholder="username"></input>
        <input onChange={this.handleInputChangePassword.bind(this)} type="text" placeholder="password"></input>
        <button onClick={this.handleInputClick.bind(this)}>submit</button>
      </form>
      )
    }
  }

export default SignUp
