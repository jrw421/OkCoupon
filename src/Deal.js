import React from 'react';
import Map from './map.js';
import Cookies from 'universal-cookie';
import Reviews from './Reviews.js';
import axios from 'axios';

const cookies = new Cookies();

class Deal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mapDisplay: false,
			description: '',
			reviews: [],
			user_name: ''
		}
		this.handleClick = this.handleClick.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
		this.saveReview = this.saveReview.bind(this);
		this.deleteComments = this.deleteComments.bind(this);
	}

	handleClick(){
		this.setState({mapDisplay: !this.state.mapDisplay});
	}

	changeRoute() {
		window.location = '/reviews'
	}

  handleInputChange(e) {
    e.preventDefault()
    this.setState({
      description: e.target.value
    })
  }

  saveReview(userID, couponURL, description) {
		console.log('BUUUUG', userID)
    axios.post('/reviews', {params: {userID: userID, couponURL: couponURL, description: description}})
    .then((res) => {
      console.log('in promise', res)
    }, this.setState({
			reviews: [...this.state.reviews, this.state.description]
		}))
  }

	getUserName() {
		var id = cookies.get('userID');

		axios.get('/userInfo', {params: {userID: id}})
		.then((res) => {
			console.log('WHAT IS RES user', res.data[0].user_name)
			this.setState({
				user_name: res.data[0].user_name
			})
		})
	}

	componentWillMount() {
		this.get()
	}

	get() {
		axios.get('/reviews', {params: {couponURL: this.props.deal.imgUrl}})
		.then((res) => {
			console.log('what is res ', res.data)
			res.data.map((item) => {
				this.setState({
					reviews: [...this.state.reviews, item.description]
				})
			})
		})
		this.getUserName()
	}

	deleteComments(id, couponURL) {
		axios.post('/deleteReview', {params: {"userID": id, "couponURL": couponURL}})
		.then((res) => {
			this.get()
		})
		this.props.delete(id, this.props.deal.imgUrl)
	}

	render(){
		{console.log('reviewss', this.state.reviews)}
		{console.log('deessccc ', this.state.description)}
		// {console.log('username ', this.state.user_name)}
		return (
		<div>
			<span className="card" style={{"float": "left", "width": "24rem", "marginRight": "5px", "marginBottom":"10px", "display":"inline-block"}}>
				<button onClick={() => {var id = cookies.get('userID'); this.deleteComments(id, this.props.deal.imgUrl)}}>delete this coupon</button>
				{this.state.mapDisplay ? <Map identifier={this.props.deal.id} className="card-img-top" lat={this.props.deal.latitude} lon={this.props.deal.longitude}/> : <img onClick={this.handleClick} className="card-img-top" src={this.props.deal.imgUrl} alt="Card image cap"></img>}

				<div className="card-block">
					<h4 className="card-title">{this.props.deal.merchant}</h4>
					<p className="card-text" style={{"whiteSpace":"nowrap","textOverflow":"ellipsis", "width":"100px"}}>{this.props.deal.title}</p>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">Original Price: ${this.props.deal.price}</li>
						<li className="list-group-item">Discount Percent: {this.props.deal.discount}</li>
						<li href={this.props.deal.url} className="btn btn-primary" style={{"position": "relative", "bottom": "0px"}}>Deal Link</li>

					</ul>
						<a className="twitter-share-button"
			        href={`https://twitter.com/intent/tweet?text=Join%20me%20on%20coupon%20adventures%21%20${this.props.deal.pureUrl}`}>
			      Tweet</a>
				</div>

					{/* <Reviews url={this.props.deal.imgUrl}/> */}
					<div>
						<br></br>
						Review this coupon:
						<form>
						<input onChange={this.handleInputChange.bind(this)} type="text" placeholder="write your review here"></input>
						<button onClick={() => {var id = cookies.get('userID'); this.saveReview(id, this.props.deal.imgUrl, this.state.description)}}>submit</button>
						</form>
						{this.state.reviews.map((item, i) => {
							return(<div><a>{this.state.user_name} : {item}</a></div>)
						})}
					</div>

			</span>
		</div>
		);
	}

}

export default Deal;
