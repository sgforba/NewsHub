import { FETCH_POSTS } from '../actions/types.js';


const initialState = {
    posts: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload,
                outlets: ['bbc','cnn','fox','nbc']
            };
           
        default:
            return state;
    }
}