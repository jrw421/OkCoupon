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
        image_url: "https://api.sqoot.com/v2/deals/5394809/image?api_key=kzjh2j",
        title: "Finding you deals!",
        merchant_name: "",
        price: "",
        discount_percentage: "",
        id: 1
      }],
      index: 0
    }
    this.incrementIndex = this.incrementIndex.bind(this);
    this.foo = this.foo.bind(this);
  }

  foo(arg) {
    this.setState({
      coupons: arg
    })
  }

  componentDidMount() {
    axios.get('/helper')
    .then(() => {
      axios.get('/arrayCoupons').then((response) => {
        this.foo(response.data);
      })
    })
  }

  componentDidUpdate() {
    console.log('componenet is updating', this.state.index)
  }

  incrementIndex() {
    // console.log('inside main.js incremneting', this.state.index)
    this.setState({index:this.state.index+1})
    // console.log(this.state.index, 'after incrementing')
  }



  render() {
    // console.log('how many times?', this.state.coupons)
    return (
    <div>
      <div className="container" style={{'height':"55%", 'width':"55%"}}>
        <App Coupon={this.state.coupons[this.state.index]} Increment={this.incrementIndex} />
      </div>
    </div>
    )
  }
}

export default Main
