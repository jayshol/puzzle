import React from 'react';
import {BrowserRouter as Router,
		Route,
		Redirect,
		Switch } from 'react-router-dom';
import TopNav from './topNav';
import Login from './login';
import SignUp from './signUp';
import Puzzle from './puzzle';
import Library from './library';

export default function PuzzleGame(props){
	return (
		<Router>
			<div className="puzzleGame">
				<TopNav />
				<main>
					<Switch>
						<Redirect exact from="/" to="/library" />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signUp" component={SignUp} />
						<Route exact path="/library" component={Library} />
						<Route exact path="/puzzle" component={Puzzle} />
					</Switch>
				</main>
			</div>
		</Router>
		
	)
}