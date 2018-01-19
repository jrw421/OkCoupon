import React from 'react';
import Coupon from './Deal.js';

const DealListComp = (props) => (
	<div className="table" style={{"width": "75%", "height": "auto", "textAlign": "center", "margin": "auto"}}>
		<h2>Here's {props.deals.length} deals that you're head over heels for!</h2>
		{props.deals.map((deal, idx) => <Coupon renderType="saved" deal={deal} key={deal.id} delete={props.delete}/> )}
	</div>
)


export default DealListComp;
