import React from 'react';
import {connect} from 'react-redux';
import './login.css';
import LoginForm from './loginForm';

export function Login(){

	return(
		<section className="login-window homeCls">
			<LoginForm />	
		</section>
	)

}

export default connect()(Login);