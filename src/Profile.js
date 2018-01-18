import React from 'react';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render(){
    {console.log("USERNAME? ", this.props.user_name)}
		return (
		<div>

		</div>
		);
	}

}

export default Profile;
