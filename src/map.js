// renders a map using the google maps API
import React from 'react';

class Map extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let pin = {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lon)};
		let map = new google.maps.Map(document.getElementById(this.props.identifier ? this.props.identifier : "map"), {
			zoom: 16,
			center: pin
		});
		let marker = new google.maps.Marker({
			position: pin,
			map: map
		});
	}

	render() {
		console.log('map props: ', this.props);
		return <div id={this.props.identifier ? this.props.identifier : "map"} style={this.props.renderType==="saved" ? {"position":"relative", "width": "100%", "height": "25%"} : {"position":"relative", "width": "100%", "height": "100%"}}></div>
	}
}

export default Map;