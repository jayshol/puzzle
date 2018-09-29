import React from 'react';
import {connect} from 'react-redux';
import './dashboard.css';
import requiresLogin from './requiresLogin';
import {fetchUserObject} from '../actions';
import PuzzleRow from './puzzleRow';

export class Dashboard extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){		
		if(this.props.user && typeof this.props.user.solvedPuzzles === "undefined"){
			this.props.dispatch(fetchUserObject(this.props.userName));
		}
	}
	render(){
		let puzzles = [];
		if(this.props.user && typeof this.props.user.solvedPuzzles !== 'undefined'){
			puzzles = this.props.user.solvedPuzzles.map((puzzle, index) => {
				return <PuzzleRow key={index} {...puzzle}/>
			});
		}
		
		return(
			<div className="homeCls">
				<div className="contentDiv">
					<h1>Dashboard</h1>
					<div className="listHeaders">
						<div>Puzzle Name</div>
						<div>Expert Level</div>
						<div>Time Taken</div>
						<div>Date Solved</div>
					</div>
					<div className="puzzlesDiv">
						{puzzles}
					</div>
				</div>
			</div>

		)
	}

}

const mapStateToProps = (state, props) => ({
	user : state.puzzle.user,
	userName: state.auth.currentUser.userName
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));