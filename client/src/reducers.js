import {MAKE_PUZZLE_PIECES, FETCH_MESSAGE_SUCCESS, FETCH_IMAGE_SUCCESS} from './actions';

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
	}],
	message: '',
	level:[{
		id: 1,
		name:'Beginner'},
		{
			id:2,
			level:'Intermediate'
		},
		{
			id:3,
			level: 'Expert'
		}],
	images:[]
}

export default function reducer(state= initialState, action){
	if(action.type === MAKE_PUZZLE_PIECES){
		const imageUrl = action.imageUrl;
		//console.log("hello");
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
					backgroundImage: 'url('+ imageUrl +')',
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