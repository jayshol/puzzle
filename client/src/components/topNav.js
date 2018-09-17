import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './topNav.css';

export function TopNav(props){
	const menuItems = props.menuItems.map(menuItem => 
		<li key={menuItem.id}>
			<Link className="linkCls" to={`/${menuItem.id}`}>
				{menuItem.name}
			</Link>
		</li>
	);

	return (
		<header className="container" role="banner">
			<nav className="navbar">
				<ul>
					{menuItems}
				</ul>
			</nav>
		</header>
	)
}

const mapStateToProps = state => ({
	menuItems : state.puzzle['menuItems']
});

export default connect(mapStateToProps)(TopNav);