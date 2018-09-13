import React from 'react';
import './puzzlePiece.css';


export default function PuzzlePiece(props){
	return(
		<div id={props.id} className="pieceStyle" draggable style={props.pieceStyle} data-pos={props.pos} onDragStart={e=>props.handleDrag(e, props.id)}></div>
	);
}