import React from 'react';
import App from './app.js';
import Navigation from './route.js'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';

import axios from 'axios';
//testing out my comments

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [{
        image_url: "http://psdwizard.com/wp-content/uploads/2016/07/octo-loader.gif",
        title: "Finding you deals!",
        merchant_name: "",
        price: "",
        discount_percentage: "",
        id: 1
      }],
      index: 0,
      postal: 0,
      flag: false,
      categories: []
    }
    this.incrementIndex = this.incrementIndex.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.foo = this.foo.bind(this);
    this.alerter = this.alerter.bind(this);
  }

  foo(arg) {
    setTimeout( () =>{
      this.setState({
        coupons: arg
      })
    }, 2000)
  }


  // componentDidMount() {
  //   console.log(this.state)
  //   axios.get('/helper')
  //   .then(() => {
  //     axios.get('/arrayCoupons').then((response) => {
  //       console.log('is the problem here??', response.data)
  //       this.foo(response.data);
  //       console.log("Coupons:",this.state.coupons);
  //     })
  //   })
  // }

  incrementIndex() {
    this.setState({index:this.state.index+1})
  }


    handleChange (e) {
    this.setState({
      postal: e.target.value
    })
  }

  handleClick () {
    console.log('going postal!!!!!', this.state.postal)
    let postal = this.state.postal
    if(postal > 1001 && postal < 99950){
      axios.post('/helper', {postal: this.state.postal}).then((res)=>{
        this.setState({flag: true})
      })
      .then(() => {
      axios.get('/arrayCoupons').then((response) => {
        console.log('is the problem here??', response.data)
        this.foo(response.data);
        console.log("Coupons:",this.state.coupons);
      })
    })
    }
  }
  
  alerter() {
    alert("you're all out of coupons! go check out what you've got saved!")
  }


  render() {
        if(this.state.flag === false){
              return (
    <div className='container'>
    <p> Whats your area code? </p>
        <input id="postal" className="password" placeholder="Your Postal Code - Here" type="text" value={this.state.sqrft} onChange={this.handleChange}/>
        <button onClick={this.handleClick} className="btn btn-dark"> Postal Code
        </button>
    </div>
    );
    } else{
      if (this.state.index === this.state.coupons.length-1) {
        return (
          <div>
            <div className="container" style={{'height':"55%", 'width':"55%"}}>
              <App Coupon={this.state.coupons[this.state.coupons.length-1]} Increment={this.alerter}/>
            </div>
          </div>
          )
      } else {
        return (
        <div>
          <div className="container" style={{'height':"55%", 'width':"55%"}}>
            <App Coupon={this.state.coupons[this.state.index]} Increment={this.incrementIndex} />
          </div>
        </div>
        )
      }
    }
  }
}

export default Main
