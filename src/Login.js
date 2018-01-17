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
      password: '',
      errorHidden: true
    }
  }

  handleInputChangeUserName(e) {
    this.setState({
      user_name: e.target.value,
      errorHidden: true
    });
  }

  handleInputChangePassword(e) {
    this.setState({
      password: e.target.value,
      errorHidden: true
    });
  }

  handleInputClick(e) {
    e.preventDefault();
    axios.post('/login', {user_name: this.state.user_name, password: this.state.password})
    .then((data) => {
      console.log('username: ', this.state.user_name)
      cookies.set("userID", data.data[0].id, {path: '/'})
      this.props.logIn(this.state.user_name);
    })
    .catch((err) => {
      this.setState({
        errorHidden: false
      });
    })
  }


  render() {
    return (
      <form>
        <input onChange={this.handleInputChangeUserName.bind(this)} type="text" placeholder="username"></input>
        <input onChange={this.handleInputChangePassword.bind(this)} type="text" placeholder="password"></input>
        {this.state.errorHidden === false ? <div id="loginError">Invalid username/password. Please try again.</div> : null}
        <button onClick={this.handleInputClick.bind(this)}>submit</button>
      </form>
      )
    }
  }

export default Login
