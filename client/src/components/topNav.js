import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './topNav.css';

export function TopNav(props){
	const menuItems = props.menuItems.map(menuItem => 
		<li key={menuItem.id}>
			<Link to={`/${menuItem.id}`}>
				{menuItem.name}
			</Link>
		</li>
	);

	return (
		<div>
			<nav>
				<ul>
					{menuItems}
				</ul>
			</nav>
		</div>
	)
}

const mapStateToProps = state => ({
	menuItems : state['menuItems']
});

export default connect(mapStateToProps)(TopNav);