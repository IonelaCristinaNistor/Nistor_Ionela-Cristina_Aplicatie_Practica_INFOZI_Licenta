import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../actions/artworkActions';

const Reactions = ({ review }) => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInformation } = userLogin;

    if (!review) {
        return null; // or a loading state
    }

    const handleLike = () => {
        if (userInformation) {
            dispatch(addLike(review._id));
        } else {
            alert('Please log in to like the review.');
        }
    };

    return (
        <div>
            <h4>{review.name || 'Anonymous'}</h4>
            <p>{review.comment || 'No comment'}</p>
            <p>Likes: {review.likes_counter || 0}</p>
            <button onClick={handleLike}>Like</button>
        </div>
    );
};

export default Reactions;
