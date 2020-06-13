import 	{GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from '../actions/types';

const initialState = {
	profile: null,
	profiles: null,
	loading: false
}

export default (state=initialState, action) => {
	switch(action.type){
		case PROFILE_LOADING : 
			return {
					...state, 
					loading: true
			}
		case GET_PROFILE :
			return{
				...state, 
				profile: action.payload,
				profiles:null,
				loading: false
			}
		case GET_PROFILES :
			return{
				...state,
				profile: null,
				profiles: action.payload,
				loading: false
			}
		case CLEAR_CURRENT_PROFILE : 
			return {...state, profile: null, loading: false}
		default:
			return state;
	}
}