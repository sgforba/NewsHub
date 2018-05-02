import { FETCH_POSTS } from './types';

export const fetchPosts = () => dispatch => {
        fetch('/api/')
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_POSTS,
            payload: data
        }));         
}
