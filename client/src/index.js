import React from 'react';
import ReactDOM from 'react-dom';
import PuzzleGame from './components/puzzleGame';
import {Provider} from 'react-redux';
import store from './store';
import './index.css';


ReactDOM.render(
				<Provider store={store}>
					<PuzzleGame />
				</Provider>, 
				document.getElementById('root')

				);

