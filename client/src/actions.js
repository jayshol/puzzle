import {API_BASE_URL} from './config';

export const MAKE_PUZZLE_PIECES = 'MAKE_PUZZLE_PIECES';
export const makePuzzlePieces = (url, width, height, level) => ({
	type: MAKE_PUZZLE_PIECES,
	imageUrl: url,
	imageWidth:width,
	imageHeight:height,
	level:level
});

export const REMOVE_PUZZLE_PIECE = 'REMOVE_PUZZLE_PIECE';
export const removePuzzlePiece = (id) => ({
	type:REMOVE_PUZZLE_PIECE,
	pieceId:id
});

export const CLEAR_PIECES_COUNT = 'CLEAR_PIECES_COUNT';
export const clearPiecesCount = () => ({
	type: CLEAR_PIECES_COUNT	
});

export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const fetchMessageSuccess = message => ({
	type:FETCH_MESSAGE_SUCCESS,
	message
});

export const fetchMessage = () => dispatch => {
	fetch(`${API_BASE_URL}/library`)
		.then(res => {
			if(! res.ok){
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(message => {
			dispatch(fetchMessageSuccess(message));
		});
}

export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const fetchImageSuccess = images => ({
	type: FETCH_IMAGE_SUCCESS,
	images
});

export const fetchImages = () => dispatch => {
	fetch(`${API_BASE_URL}/library/images`)
		.then(res => {
			if(!res.ok){
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(images => {
			dispatch(fetchImageSuccess(images))
		});
}