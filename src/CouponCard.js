import React from 'react';

const CouponCard = (props) => {
  return (
      <div className="card mx-auto text-center" style={{"top": props.top+"px", "left": props.left+"px", "opacity": props.opacity}}>
        <img className="card-img-top" src={props.image} onerror="http://psdwizard.com/wp-content/uploads/2016/07/octo-loader.gif"></img>
        <div className="card-body">
          <h5 className="card-title">{props.merchant}</h5>
          <p className="card-text">{props.title}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Original Price: ${props.price}</li>
          <li className="list-group-item">Discount Percent: {props.discount}</li>
        </ul>
      </div>
  )
}
export default CouponCard;
