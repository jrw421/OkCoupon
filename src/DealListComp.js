import React from 'react';
import Coupon from './Deal.js';

const DealListComp = (props) => (
	<div>
		<h2>Here's {props.deals.length} deals that you're head over heels for!</h2>
		{props.deals.map((deal, idx) => <Deal deal={deal} key={idx}/>)}
	</div>
)


export default DealListComp;
