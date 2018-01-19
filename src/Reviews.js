import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Reviews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      description: '',
      reviews: []
		}
    // const id = cookies.get('userID');
    this.saveReview = this.saveReview.bind(this)
	}

  handleInputChange(e) {
    e.preventDefault()
    this.setState({
      description: e.target.value
    })
  }

  saveReview(userID, couponURL, description) {
    // var id = cookies.get('userID');
    axios.post('/reviews', {params: {userID: id, couponURL: coup, description: description}})
    .then((res) => {
      console.log('in promise ', res)
      this.setState({
        reviews: res.data
      })
    })
    .catch((err) => {
      console.log('gosh darn it')
    })
  }

  componentDidMount() {
    console.log('where are you')
    // axios.get('/reviews', {params: {id, this.props.deal.imgUrl}})
  }

  render(){
    return (
    <div>
      Review this coupon:
      <form>
      <input onChange={this.handleInputChange.bind(this)} type="text" placeholder="write your review here"></input>
      <button onClick={() => {var id = cookies.get('userID'); this.saveReview(id, this.props.url, this.state.description)}}>submit</button>
      </form>
      {this.state.description}
      <br></br>
    </div>
    );
  }

}

 // onClick={() => {var id = cookies.get('userID'); this.saveReview(id, props.deal.imgUrl, this.state.description)}}

export default Reviews;
