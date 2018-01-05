import React from 'react';

const Deal = (props) => (
	<div>
		<div className="card" style={{"float": "left", "width": "25rem", "height": "30rem", "margin": "10px"}}>
			<img className="card-img-top" src={props.deal.imgUrl} alt="Card image cap"></img>
			<div className="card-block">
				<h4 className="card-title">{props.deal.merchant}</h4>
				<p className="card-text">{props.deal.title}</p>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Original Price: ${props.deal.price}</li>
					<li className="list-group-item">Discount Percent: {props.deal.discount}</li>
				</ul>
				<a href={props.deal.url} className="btn btn-primary" style={{"position": "absolute", "bottom": "0px"}}>Deal Link</a>
					<a class="twitter-share-button"
		        href={`https://twitter.com/intent/tweet?text=Join%20me%20on%20coupon%20adventures%21%20${props.deal.pureUrl}`}>
		      Tweet</a>
			</div>
		</div>
	</div>
)

export default Deal;
