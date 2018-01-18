import React from 'react';
import axios from 'axios'
import DealList from './DealListComp.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class SavedDealsComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			savedDeals: []
		}
		this.getDeals = this.getDeals.bind(this);
		this.delete = this.delete.bind(this);
		this.get = this.get.bind(this);
	}

	componentDidMount() {
		const id = cookies.get('userID');
		console.log('id: ', id);

		axios.get('/savedCoupons', {params: {"userID": id}})
		.then((response) => {
			this.getDeals(response)
		})
	}

	get() {
		const id = cookies.get('userID');
		axios.get('/savedCoupons', {params: {"userID": id}})
		.then((response) => {
			this.getDeals(response)
		})
	}

	getDeals(response) {
		this.setState({savedDeals: response.data})
	}

	delete(id, couponURL) {
		axios.post('/delete', {params: {"userID": id, "couponURL": couponURL}})
		.then((res) => {
			this.get()
		})
	}

	render() {
		{console.log("DEALS " , this.state.savedDeals)}
		return (
			<div className="container">
				<div style={{"left": "50px"}}>
					<h1>Saved Deals!</h1>
				</div>
				<DealList deals={this.state.savedDeals} delete={this.delete}/>
			</div>
		)
	}
}

export default SavedDealsComp;
