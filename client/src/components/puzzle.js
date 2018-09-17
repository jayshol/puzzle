import React from 'react';
import PuzzlePiece from './puzzlePiece';
import {makePuzzlePieces} from '../actions';
import {connect} from 'react-redux';

import './puzzle.css';

export class Puzzle extends React.Component{
	constructor(props){
		super(props);		
		this.startGame = this.startGame.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
	}

	componentDidMount(){
		//console.log("did mount");
		this.props.dispatch(makePuzzlePieces(this.props.image.url));
	}

	startGame(e){
		this.props.dispatch(makePuzzlePieces());
		
	}

	handleDragStart(e,id){
		e.dataTransfer.setData("id", id);
		console.log(id);

	}

	handleDrop(e){
		e.preventDefault();
		const id = e.dataTransfer.getData('id');
		const x = e.clientX;
		const y = e.clientY;
		const updatedStyle = {
			left:e.clientY,
			top: e.clientX
		}
		console.log(updatedStyle);

		const puzzPieces = this.state.pieces.filter(piece => {
			if(piece.id === id){
				piece.left = e.screenX;
				piece.top = e.screenY;
			}
			return piece;
		}); 
		
		
		this.setState({
			pieces: puzzPieces
		});
	}

	handleDragOver(e){
		e.preventDefault();
	}

	



	render() {
		const pieces = this.props.pieces.map((piece, index) => {
			return <PuzzlePiece key={index} index={index} {...piece} handleDrag={this.handleDragStart} />
		}); 
		//console.log(this.props.image.url);
		return (
			<div className="outerDiv">
				<div id="wrapperDiv" className="wrapperDiv" onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
					<div className="ImageDiv">
						<img className="imageCls" src={process.env.PUBLIC_URL +`${this.props.image.url}`} alt="image"/>
						<div className="piecesContainer">							
							{ pieces }  
						</div>
						<span id="slotsSpan">
							{/* this.state.slots */}
						</span>											
					</div>
				</div>
				<button className="buttonCls" onClick={this.startGame}>Start</button>
			</div>			
		);
	}
}

const mapStateToProps = (state , props) => {	
	const image = state.puzzle["images"].find(image => image.name === props.match.params.imageName);
	console.log(image.name);
	return {
		image : image,
		pieces:state.puzzle.pieces
	}
};

export default connect(mapStateToProps)(Puzzle);