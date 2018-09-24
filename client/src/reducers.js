import {MAKE_PUZZLE_PIECES, 
		FETCH_MESSAGE_SUCCESS, 
		FETCH_IMAGE_SUCCESS, 
		REMOVE_PUZZLE_PIECE,
		CLEAR_PIECES_COUNT } from './actions';

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
	},
	{	id: 'library',
		name: 'Library'
	},
	{
		id:'puzzle/Clover',
		name:'Puzzle'
	}],
	message: '',
	levels:[{
		id: "1",
		name:'Beginner',
		rowColNumber: 2},
		{
			id:"2",
			name:'Intermediate',
			rowColNumber:3
		},
		{
			id:"3",
			name: 'Expert',
			rowColNumber:4
		}],
	images:[],
	piecesCount:0
}

export default function reducer(state= initialState, action){
	if(action.type === MAKE_PUZZLE_PIECES){
		const imageUrl = action.imageUrl;
		const imgWidth = action.imageWidth;
		const imgHeight = action.imageHeight;
		console.log(action.level);
		const level = state.levels.find((level) =>{			
			return level.id === action.level;
		});
		
		const rowCol = level.rowColNumber;
		const pieceWidth = imgWidth /rowCol;
		const pieceHeight = imgHeight/rowCol;
		const maxX = 700 - pieceWidth;
		const maxY = 700 - pieceHeight;
		const totPieces = [];
		const slots = [];

		for(let x=0;x<rowCol;x++){
			for(let y=0;y<rowCol;y++){
				const id = 'div-' + x + "-" + y;
				const pos = x + '_' + y;
				const slotId = 'slot-'+ x + "-" + y;

				const pieceObject = {
					id:id,					
					pos:pos,
					width: pieceWidth,
					height: pieceHeight,
				/*	left:Math.floor(Math.random()*(maxY+1)),
					top:Math.floor(Math.random()*(maxX+1)),*/
				/*	zIndex: Math.floor(Math.random()*10+1), */
					backgroundImage: 'url('+ imageUrl +')',
					backgroundPosition: (-y*pieceWidth)+'px '+(-x*pieceHeight)+'px',					
					backgroundSize: imgWidth + 'px ' + imgHeight + 'px',


				}

				totPieces.push(pieceObject);							
				
				// shuffle the puzzle pieces
				for (let i = totPieces.length - 1; i > 0; i--) {
			        const j = Math.floor(Math.random() * (i + 1));
			        [totPieces[i], totPieces[j]] = [totPieces[j], totPieces[i]]; // eslint-disable-line no-param-reassign
			    }

				
				const slotStyle= {
					width: pieceWidth,
                    height: pieceHeight,
                    left: y*pieceWidth,
                    top: x*pieceHeight
				}

				const slotObject = {
					width: pieceWidth,
                    height: pieceHeight,
                    left: y*pieceWidth,
                    top: x*pieceHeight,
                    id: slotId,
                    pos:pos                    
				}
				slots.push(slotObject);
			}
		}

		return Object.assign({}, state, {
			pieces:totPieces,
			slots:slots,
			piecesCount : totPieces.length
		});
	}

	if(action.type === REMOVE_PUZZLE_PIECE){
		const id = action.pieceId;
		const pieces = state.pieces.filter((piece, index) => {
			return piece.id !== id;
		});
		return Object.assign({}, state, {
			pieces:pieces
		});
	}

	if(action.type === CLEAR_PIECES_COUNT){
		return Object.assign({}, state, {
			piecesCount : 0
		});
	}

	if(action.type === FETCH_MESSAGE_SUCCESS){
		console.log(action.message.message);
		return Object.assign({}, state, {
			message: action.message.message
		});
	}

	if(action.type === FETCH_IMAGE_SUCCESS){
		console.log(action.images);
		return Object.assign({}, state, {
			images: action.images
		});
	}

	return state;
}