import axios from 'axios';
import {FETCH_ERRORS} from './types';


export const createExperience = (values, push) => async dispatch => {
	try{
		await axios.post('/api/profile/experience/add', values);
		push('/dashboard');
	}catch(err){
		console.log(err);
		dispatch({type: FETCH_ERRORS, payload: err.response.data});
	}
}

