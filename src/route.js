import React from 'react';
import ReactDOM from 'react-dom';

import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';

 import Home from './main.js';
 import SavedDealsComp from './SavedDealsComp.js'
 import Login from './Login.js';
 import SignUp from './SignUp.js'

 //import path files

//Create Nav Bar with links

//Move route paths to App using React-Router-switch statments
//React Router switch

// const Navigation = () => (

class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      user_name: ''
    }
    this.logIn = this.logIn.bind(this)
  }

  logIn(username) {
    this.setState({
      loggedIn: true,
      user_name: username
    })
  }

  logOut() {
    this.setState({
      loggedIn: false
    })
    cookies.remove(this.state.user_name)
  }

  render() {
    // return(

    {if (!this.state.loggedIn) {
      return (<div>
        login
        <Login logIn={this.logIn}/>
        sign up
        <SignUp/>
      </div>)
    } else {
      return (<Router>
  	  <div>
          <div className="container" styles={{"height": "100%", "width": "100%"}}>
            <div className="container">
              <nav className="navbar navbar-expand{-sm|-md|-lg|-xl} navbar-light bg-light">
                <a className="navbar-brand" href="#">OkCoupon</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav" style={{textAlign: 'right'}}>
                  <ul className="navbar-nav">

                    <li className="nav-item active">
                      <div className="nav-link"><Link to="/">More Coupons</Link></div>
                    </li>

                    <li className="nav-item">
                      <div className="nav-link"><Link to="/saved">Saved Coupons</Link></div>
                    </li>

                    <li className="nav-item" onClick={() => {this.logOut()}}>
                      <div className="nav-link"><Link to="/">Log out</Link></div>
                    </li>



                  </ul>
                </div>
              </nav>
            </div>
          </div>

  	    <Route exact path="/" component={Home}/>
        <Route path="/saved" component={SavedDealsComp}/>
        {/* <Route path="/newUser" component={SignUp}/> */}

        </div>
      </Router>)
    // )
  }}
  }
}



export default Navigation;
