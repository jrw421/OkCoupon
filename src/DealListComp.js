import React from 'react';
import Coupon from './Deal.js';

const DealListComp = (props) => (
	<div className="container">
		<h2>Here's {props.deals.length} deals that you're head over heels for!</h2>
		{props.deals.map((deal, idx) => <Coupon deal={deal} key={deal.id} delete={props.delete}/>)}
	</div>
)


export default DealListComp;
