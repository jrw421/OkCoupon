import React from 'react';
import Navigation from './route.js'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Login extends React.Component {
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
    // console.log("stuff", this.state.user_name, this.state.password)
    e.preventDefault()
    axios.post('/login', {user_name: this.state.user_name, password: this.state.password})
    .then((data) => {
      cookies.set(this.state.user_name, data.data[0].id, {path: '/'})
      console.log(data.data[0])
      this.props.logIn(this.state.user_name);
    })
    .catch((err) => {
      console.log('Do you need to sign up?')
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

export default Login
