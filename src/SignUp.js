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
    e.preventDefault()
    axios.post('/signUp', {user_name: this.state.user_name, password: this.state.password})
    .then((res) => {
      this.setState({
        user_name: '',
        password: ''
      })
      console.log('success!')
    })
  }


  render() {
    return (
      <form>
        <input onChange={this.handleInputChangeUserName.bind(this)} value={this.state.user_name} type="text" placeholder="username"></input>
        <input onChange={this.handleInputChangePassword.bind(this)} value={this.state.password} type="text" placeholder="password"></input>
        <button onClick={this.handleInputClick.bind(this)}>submit</button>
      </form>
      )
    }
  }

export default SignUp
