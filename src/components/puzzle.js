import React from 'react';
import ReactDom from 'react-dom';
import PuzzlePiece from './puzzlePiece';

import './puzzle.css';

export default class Puzzle extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			pieces:[],
			slots:[]
		}

		this.startGame = this.startGame.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
	}

	startGame(e){
		this.makePuzzlePiecesAndSlots();
		
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

	/*	const puzzPieces = this.state.pieces.filter(piece => {
			if(piece.id === id){
				console.log("before");
				
				 piece.style = Object.assign({},piece.style, updatedStyle);
				console.log("after");
				console.log(piece);
			}
			return piece;
		}); 
		
		
		this.setState({
			pieces: puzzPieces
		});
*/
	}

	handleDragOver(e){
		e.preventDefault();
	}

	makePuzzlePiecesAndSlots(){
		const pieceWidth = 550 /2;
		const pieceHeight = 550/2;
		const maxX = parseInt(700 - pieceWidth);
		const maxY = parseInt(700 - pieceHeight);
		const totPieces = [];
		const slots = [];
		const pieceClass = "sp_" + new Date().getTime();

		for(let x=0;x<2;x++){
			for(let y=0;y<2;y++){

				const style = {
					width: 550/2,
					height: 550/2,
					left:Math.floor(Math.random()*(maxY+1)),
					top:Math.floor(Math.random()*(maxX+1)),
					zIndex: Math.floor(Math.random()*10+1),
					backgroundImage: 'url(/images/clover.jpg)',
					backgroundPosition: (-y*pieceWidth)+'px '+(-x*pieceHeight)+'px',
					backgroundSize: '550px'			
				}

				
				const id = 'div-' + x + "-" + y;
				const pos = x + '_' + y;

				const pieceObject = {
					id:id,
					pieceStyle:style,
					pos:pos
				}

				totPieces.push(pieceObject);
				
			//	totPieces.push(<div id={id} key={id} className="pieceStyle" draggable style={style} data-pos={pos} ondragStart={this.handleDragStart}></div>);
						
				
				const slotStyle= {
					width: pieceWidth,
                    height: pieceHeight,
                    left: y*pieceWidth,
                    top: x*pieceHeight
				}
				slots.push(<div className="slotClass" key={id} data-pos={x + '_' +y} style={slotStyle} onDrop={this.handleDrop} onDragOver={this.handleDragOver}></div>);
			}
		}
	//	console.log(totPieces);
		this.setState({
			pieces:totPieces,
			slots:[...this.state.slots, slots]
		});
	}



	render() {
		const pieces = this.state.pieces.map((piece, index) => {
			return <PuzzlePiece key={index} index={index} {...piece} handleDrag={this.handleDragStart} />
		});
		console.log(pieces);
		return (
			<div className="outerDiv">
				<div id="wrapperDiv" className="wrapperDiv" onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
					<div className="ImageDiv">
						<img className="imageCls" src={process.env.PUBLIC_URL +'/images/clover.jpg'} alt="image"/>
						<div className="piecesContainer">							
							{pieces}
						</div>
						<span id="slotsSpan">
							{this.state.slots}
						</span>											
					</div>
				</div>
				<button className="buttonCls" onClick={this.startGame}>Start</button>
			</div>			
		);
	}
}