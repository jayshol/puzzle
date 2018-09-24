import React from 'react';
import './slotPiece.css';

export default function SlotPiece(props){
	let opacity = 0.5;
	if(props.level === "2"){
		opacity = 0.7;
	}else if(props.level === "3"){
		opacity = 1;
	}

	const slotStyle = {
		width:props.width,
		height:props.height,
		left: props.left,
		top:props.top,
		opacity:opacity
	}
	return (
		<div id={props.id} 
			className="slotClass" 
			style={slotStyle}
			data-pos={props.pos} 
			onDrop={props.handleDrop} 
			onDragOver={props.handleDragOver}>
		{/*piece */}
		</div>
	);
}