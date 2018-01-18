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
      <div className="container" style={{width: "50%", marginLeft: "auto", marginRight: "auto"}}>

      <form className="form-signin">
      <h3>Login</h3>
      
        <input type="email" style={{'margin-bottom': '-1px', 'border-bottom-right-radius': '0', 'border-bottom-left-radius': '0'}} id="inputUser" className="form-control" onChange={this.handleInputChangeUserName.bind(this)} type="text" placeholder="username"></input>
      
        <input type="password" style={{'margin-bottom': '10px', 'border-top-left-radius': '0', 'border-top-right-radius': '0'}} id="inputPassword" className="form-control" onChange={this.handleInputChangePassword.bind(this)} type="text" placeholder="password"></input>
        {this.state.errorHidden === false ? <div id="loginError">Invalid username/password. Please try again.</div> : null}
        <button className="btn btn-lg btn-primary btn-block" onClick={this.handleInputClick.bind(this)}>Log In</button>
      </form>
      </div>
      )
    }
  }

export default Login
