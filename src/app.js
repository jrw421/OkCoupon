import React from 'react';
import CouponCard from './CouponCard.js';
import Swipe from 'react-easy-swipe';
import axios from 'axios';
import Map from './Map.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: this.props.Coupon.imgUrl || 'http://psdwizard.com/wp-content/uploads/2016/07/octo-loader.gif',
      title: this.props.Coupon.title, 
      merchant_name: this.props.Coupon.merchant,
      price: this.props.Coupon.price,
      discount_percentage: this.props.Coupon.discount,
      id: this.props.Coupon.id,
      lat: this.props.Coupon.latitude,
      lon: this.props.Coupon.longitude,
      position: 0,
      top: 5,
      left: 0,
      opacity: 1,
      mapDisplay: false // onClick of button, flip this to render map
    }
    this.YesButton = this.YesButton.bind(this);
    this.NoButton = this.NoButton.bind(this);
    this.onSwipeStart = this.onSwipeStart.bind(this);
    this.onSwipeMove = this.onSwipeMove.bind(this);
    this.onSwipeEnd = this.onSwipeEnd.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
  }

  toggleMap(e) {
    this.setState({mapDisplay: !this.state.mapDisplay}, () => {
      this.state.mapDisplay ? console.log('show the map.') : console.log('hide the map.');
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log("before setState:", this.state, "this props:", nextProps);
    this.setState({
      image_url: nextProps.Coupon.imgUrl,
      title: nextProps.Coupon.title,
      merchant_name: nextProps.Coupon.merchant,
      price: nextProps.Coupon.price,
      discount_percentage: nextProps.Coupon.discount,
      id: nextProps.Coupon.id,
      lat: nextProps.Coupon.latitude,
      lon: nextProps.Coupon.longitude,
      top: 5,
      left: 0,
      opacity: 1
    })
  }

  componentDidUpdate(){
    console.log("inside app anfd updating", this.state)
  }

  getDeals() {
    axios.get('/')
    .then(function(response) {
      console.log('successful post');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  YesButton() {
    axios.post('/yes', {
      id: this.state.id
    })
      .then((response) => {
        console.log('response from clicking yes', response)
      })
      .catch((err) => {
        console.error(err);
      });


      this.props.Increment();
      if ( this.state.mapDisplay ) this.setState({mapDisplay: false});
  }

  NoButton() {
    axios.post('/no', {
      id: this.state.id
    })
      .then((response) => {
        console.log("response from clicking no", response)
      })
      .catch((err) => {
        console.error(err);
      });
      this.props.Increment();
      if ( this.state.mapDisplay ) this.setState({mapDisplay: false});
  }

  onSwipeStart(event) {
    console.log('Start swiping...', event);
  }

  onSwipeMove(position, event) {
    console.log(`Moved ${position.x} pixels horizontally`, event);
    console.log(`Moved ${position.y} pixels vertically`, event);
    this.setState({left: position.x,
                   position: position.x,
                   top: position.y,
                   opacity: this.state.opacity - .15})
  }

  onSwipeEnd(event) {
    // console.log('End swiping...', event);
    // console.log('this state inside from onSwipeEnd', this.state)
    this.evaluatePosition()
    //call some function
    //said function needs to access the state.position at last update
    //in that function evaluate that state value and clal either yes or no
  }

  evaluatePosition() {
    // console.log('inside evaluate position')
    let pos = this.state.position;
    if (Math.abs(pos) > 100) {
      if (pos > 0) {
        setTimeout(() => {this.YesButton()}, 500);
      } else {
        setTimeout(() => {this.NoButton()}, 500);
      }
    }
  }

  render() {
        console.log("APP.JS COUPONS", this.props.Coupon, "This state:",this.state)
    return (
      <div className="valueHolder" value={this.state.postion} styles={{"height": "100%", "width": "100%"}}>
        <button id="showMap" onClick={this.toggleMap}>{this.state.mapDisplay ? "show coupon" : "show location"}</button>
        { this.state.mapDisplay ? <Map lat={this.state.lat} lon={this.state.lon}/> : <Swipe
          onSwipeStart={this.onSwipeStart}
          onSwipeMove={this.onSwipeMove}
          onSwipeEnd={this.onSwipeEnd}
          >


            <CouponCard image={this.state.image_url}
              title={this.state.title}
              merchant={this.state.merchant_name}
              price={this.state.price}
              discount={this.state.discount_percentage}
              top={this.state.top}
              left={this.state.left}
              opacity={this.state.opacity}/>
        </Swipe>}
        <h4></h4>
          <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.YesButton}>Yes</button>
          <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.NoButton}>No</button>
      </div>
    )
  }
}

export default App;
