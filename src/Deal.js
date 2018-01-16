import React from 'react';
import Map from './map.js';

class Deal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mapDisplay: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({mapDisplay: true});
	}	

	render(){
		return (
		<div>
			<div className="card" style={{"float": "left", "width": "25rem", "height": "30rem", "margin": "10px"}}>
				{this.state.mapDisplay ? <Map identifier={this.props.deal.id} className="card-img-top" lat={this.props.deal.latitude} lon={this.props.deal.longitude}/> : <img onClick={this.handleClick} className="card-img-top" src={this.props.deal.imgUrl} alt="Card image cap"></img>}
				<div className="card-block">
					<h4 className="card-title">{this.props.deal.merchant}</h4>
					<p className="card-text">{this.props.deal.title}</p>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">Original Price: ${this.props.deal.price}</li>
						<li className="list-group-item">Discount Percent: {this.props.deal.discount}</li>
					</ul>
					<a href={this.props.deal.url} className="btn btn-primary" style={{"position": "absolute", "bottom": "0px"}}>Deal Link</a>
						<a class="twitter-share-button"
			        href={`https://twitter.com/intent/tweet?text=Join%20me%20on%20coupon%20adventures%21%20${this.props.deal.pureUrl}`}>
			      Tweet</a>
				</div>
			</div>
		</div>
		);
	}

}

export default Deal;
