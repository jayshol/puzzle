import React from 'react';
import {connect} from 'react-redux';

export function Library(){
	return(
		<div>Library</div>
	)
}

export default connect()(Library);