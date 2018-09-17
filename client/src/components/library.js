import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './library.css';

import {fetchMessage, fetchImages} from '../actions';


export class Library extends React.Component{
	constructor(props)	{
		super(props);
	}

	componentDidMount(){
		this.props.dispatch(fetchImages());
	}	

	render(){
		const images = this.props.imageList.map((image, index) => 
			<Link key={index} to={`/puzzle/${image.name}`}>
				<img className="imageIcon" src={process.env.PUBLIC_URL+`${image.url}`} />
			</Link>
		);
		console.log(this.props.imageList);
		return	(
			<div className="homeCls">
				{images}
			</div>
		)	
	}	
}

const mapStateToProps = state => ({
	message:state.puzzle['message'],
	imageList: state.puzzle['images']
});

export default connect(mapStateToProps)(Library);