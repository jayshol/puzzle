import {createStore} from 'redux';
import{puzzleReducer} from './reducers';

export default createStore(puzzleReducer);
