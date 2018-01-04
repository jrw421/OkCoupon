import React from 'react';
import CouponCard from './CouponCard.js'
import Swipe from 'react-easy-swipe'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: this.props.Coupon.imgUrl,
      title: this.props.Coupon.title,
      merchant_name: this.props.Coupon.merchant,
      price: this.props.Coupon.price,
      discount_percentage: this.props.Coupon.discount,
      id: this.props.Coupon.id,
      position: 0
    }
    this.YesButton = this.YesButton.bind(this);
    this.NoButton = this.NoButton.bind(this);
    this.onSwipeStart = this.onSwipeStart.bind(this);
    this.onSwipeMove = this.onSwipeMove.bind(this);
    this.onSwipeEnd = this.onSwipeEnd.bind(this);
    this.evaluatePosition = this.evaluatePosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      image_url: nextProps.Coupon.imgUrl,
      title: nextProps.Coupon.title,
      merchant_name: nextProps.Coupon.merchant,
      price: nextProps.Coupon.price,
      discount_percentage: nextProps.Coupon.discount,
      id: nextProps.Coupon.id
    })
  }

  componentDidUpdate(){
    // console.log("inside app and updating", this.state)
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
    // axios.post('/yes', {
    //   id: this.state.id
    // })
    //   .then((response) => {
    //     console.log('response from clicking yes', response)
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

      this.props.Increment();
  }

  NoButton() {
    // axios.post('/no', {
    //   id: this.state.id
    // })
    //   .then((response) => {
    //     console.log("response from clicking no", response)
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

      this.props.Increment()
  }

  onSwipeStart(event) {
    console.log('Start swiping...', event);
  }

  onSwipeMove(position, event) {
    // console.log(`Moved ${position.x} pixels horizontally`, event);
    // console.log(`Moved ${position.y} pixels vertically`, event);
    this.setState({position: position.x})
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
        this.YesButton();
      } else {
        this.NoButton();
      }
    }
  }

  render() {
        // console.log("APP.JS COUPONS", this.props.Coupon, "This state:",this.state)
    return (
      <div className="valueHolder" value={this.state.postion} styles={{"height": "100%", "width": "100%"}}>
        <Swipe
          onSwipeStart={this.onSwipeStart}
          onSwipeMove={this.onSwipeMove}
          onSwipeEnd={this.onSwipeEnd}>

          <CouponCard image={this.state.image_url}
            title={this.state.title}
            merchant={this.state.merchant_name}
            price={this.state.price}
            discount={this.state.discount_percentage}
            />
        </Swipe>
        <h4></h4>
          <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.YesButton}>Yes</button>
          <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.NoButton}>No</button>
      </div>
    )
  }
}

export default App;
