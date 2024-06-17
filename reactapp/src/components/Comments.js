import React from 'react';

const Comments = ({ review }) => {

    if (!review) {
        return null; // or a loading state
    }

    return (
        <div>
            {review.name || 'Anonymous'}
            <p>{review.comment || 'No comment'}</p>
        </div>
    );
};

export default Comments;
