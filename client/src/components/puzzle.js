import React from 'react';
import PuzzlePiece from './puzzlePiece';
import SlotPiece from './slotPiece';
import { makePuzzlePieces,
		 removePuzzlePiece,
		 clearPiecesCount,
		 fetchUserObject, 
		 updateUser,
		 removeSlotPieces } from '../actions';
import {connect} from 'react-redux';
import requiresLogin from './requiresLogin';
import ReactDom from 'react-dom';
import {formatDate, formatTime} from '../actions/utils';


import './puzzle.css';

export class Puzzle extends React.Component{
	constructor(props){
		super(props);		
		this.reStartGame = this.reStartGame.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);					

		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
		this.count = 0;
		this.state = {
			time:0,
			result:''			
		}

	}

	componentDidMount(){
		this.props.dispatch(fetchUserObject(this.props.userName));
		this.width= document.getElementById("puzzleImage").width;	
		this.height = document.getElementById("puzzleImage").height;
		this.props.dispatch(makePuzzlePieces(this.props.image.url, this.width, this.height, this.props.level));
		this.startTimer();
	}

	startTimer(){
		this.timer = setInterval(() => this.setState({			
			time:this.state.time + 1			
		}), 1000);
	}

	reStartGame(e){
		this.props.dispatch(removeSlotPieces());
		this.setState({
			time:0,
			result:''
		})
		this.props.dispatch(makePuzzlePieces(this.props.image.url, this.width, this.height, this.props.level));
		//this.props.dispatch(removeSlotPieces());
		this.startTimer();
	}

	handleDragStart(event,id){
		event.dataTransfer.setData("id", id);
	}

	handleDrop(event){
		const id = event.dataTransfer.getData('id');
		console.log(id);
		const element = document.getElementById(id);
		console.log(element);
		console.log();
		if(event.currentTarget.id.split("slot-")[1] === id.split("div-")[1]){
			event.currentTarget.style.opacity = 0;
			this.props.dispatch(removePuzzlePiece(id));
			this.count += 1;
			
			console.log(this.count);
		}
		if(this.count === this.props.piecesCount){
			clearInterval(this.timer);
			this.setState({
				result: 'Congratulations. You solved the puzzle.' + this.state.time + 'seconds.'
			});
			const puzzleObject = {
				puzzleName: this.props.image.name,
				expertLevel: this.props.level,
				timeTaken: this.state.time,
				dateSolved: formatDate(new Date())
			}
			console.log(puzzleObject);
			console.log(this.props.user);
			const updatedUser = this.props.user;
			updatedUser.solvedPuzzles.push(puzzleObject);
			console.log(updatedUser);
			this.props.dispatch(updateUser(updatedUser, this.props.user._id));
		}
	}	

	handleDragOver(event){
		event.preventDefault();
	}



	render() {		
		
		const pieces = this.props.pieces.map((piece, index) => {
			return ( 
				<PuzzlePiece 
					key={index} 
					index={index} 
					{...piece} 
					handleDrag={this.handleDragStart}
					 />
				);
		});

		const slots = this.props.slots.map((slot, index)  => {
			return (
				<SlotPiece
					key={index}
					index={index}
					level={this.props.level}
					{...slot}
					handleDrop={this.handleDrop}
					handleDragOver={this.handleDragOver}
				/>
			);
		});
		//console.log(this.props.image.url);
		return (
			<div className="outerDiv" id="outerDiv" ref={div =>(this.div = div)}>
				<div id="wrapperDiv" className="wrapperDiv" >
					<h1>{formatTime(this.state.time)}</h1>
					<h2>{this.state.result}</h2>
					<div className="ImageDiv">
						<img id="puzzleImage" className="imageCls" src={process.env.PUBLIC_URL +`${this.props.image.url}`} alt="image"/>
						<span id="slotsSpan">
							{slots}
						</span>											
					</div>
					<div className="piecesContainer">							
						{ pieces }  
					</div>
				</div>
				<button className="buttonCls" onClick={this.reStartGame}>Restart</button>
			</div>			
		);
	}
}

const mapStateToProps = (state , props) => {	
	const image = state.puzzle["images"].find(image => image.name === props.match.params.imageName);
	console.log(state.auth.currentUser);
	const level = props.match.params.level;	
	return {
		image : image,
		pieces:state.puzzle.pieces,
		slots:state.puzzle.slots,
		level: level,
		piecesCount:state.puzzle.piecesCount,
		user:state.puzzle.user,
		userName:state.auth.currentUser.userName				
	}
};

export default requiresLogin()(connect(mapStateToProps)(Puzzle));