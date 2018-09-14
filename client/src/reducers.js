import {MAKE_PUZZLE_PIECES} from './actions';

const initialState = {
	pieces:[],
	slots:[],
	menuItems:[{
		id: 'login',
		name: 'Login'		
	},
	{
		id: 'signUp',
		name: 'SignUp'		
	}]
}

export const puzzleReducer = (state= initialState, action) => {
	if(action.type === MAKE_PUZZLE_PIECES){
		const pieceWidth = 550 /2;
		const pieceHeight = 550/2;
		const maxX = parseInt(700 - pieceWidth);
		const maxY = parseInt(700 - pieceHeight);
		const totPieces = [];
		const slots = [];

		for(let x=0;x<2;x++){
			for(let y=0;y<2;y++){
				const id = 'div-' + x + "-" + y;
				const pos = x + '_' + y;

				const pieceObject = {
					id:id,					
					pos:pos,
					width: pieceWidth,
					height: pieceHeight,
					left:Math.floor(Math.random()*(maxY+1)),
					top:Math.floor(Math.random()*(maxX+1)),
					zIndex: Math.floor(Math.random()*10+1),
					backgroundImage: 'url(/images/clover.jpg)',
					backgroundPosition: (-y*pieceWidth)+'px '+(-x*pieceHeight)+'px',
					backgroundSize: '550px'	
				}

				totPieces.push(pieceObject);							
						
				
				const slotStyle= {
					width: pieceWidth,
                    height: pieceHeight,
                    left: y*pieceWidth,
                    top: x*pieceHeight
				}
			//	slots.push(<div className="slotClass" key={id} data-pos={x + '_' +y} style={slotStyle} onDrop={this.handleDrop} onDragOver={this.handleDragOver}></div>);
			}
		}

		return Object.assign({}, state, {
			pieces:totPieces,
			slots:slots
		});
	}

	return state;
}