import React from 'react';
import PuzzlePiece from './puzzlePiece';
import SlotPiece from './slotPiece';
import {makePuzzlePieces, removePuzzlePiece, clearPiecesCount} from '../actions';
import {connect} from 'react-redux';
import ReactDom from 'react-dom';

import './puzzle.css';

export class Puzzle extends React.Component{
	constructor(props){
		super(props);		
		this.startGame = this.startGame.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);					

		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
		this.count = 0;
								
	}

	componentDidMount(){
		this.width= document.getElementById("puzzleImage").width;	
		this.height = document.getElementById("puzzleImage").height;
		this.props.dispatch(makePuzzlePieces(this.props.image.url, this.width, this.height, this.props.level));		
	}

	startGame(e){
		this.props.dispatch(makePuzzlePieces(this.props.image.url, this.width, this.height, this.props.level));
		
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
			alert("You Won");
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
				<button className="buttonCls" onClick={this.startGame}>Start</button>
			</div>			
		);
	}
}

const mapStateToProps = (state , props) => {	
	const image = state.puzzle["images"].find(image => image.name === props.match.params.imageName);
//	console.log(image.name);
	const level = props.match.params.level;
	return {
		image : image,
		pieces:state.puzzle.pieces,
		slots:state.puzzle.slots,
		level: level,
		piecesCount:state.puzzle.piecesCount
	}
};

export default connect(mapStateToProps)(Puzzle);