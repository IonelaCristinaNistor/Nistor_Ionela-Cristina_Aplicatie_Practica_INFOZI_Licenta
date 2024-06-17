import React from 'react';

const Comments = ({ review }) => {

    if (!review) {
        return null; 
    }

    return (
        <div>
            {review.name || 'Anonymous'}
            <p>{review.comment || 'No comment'}</p>
        </div>
    );
};

export default Comments;
