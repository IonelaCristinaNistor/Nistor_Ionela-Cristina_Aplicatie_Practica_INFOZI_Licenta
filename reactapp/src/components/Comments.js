import React from 'react';

const Comments = ({ reaction }) => {

    if (!reaction) {
        return null; 
    }

    return (
        <div>
            {reaction.name || 'Anonymous'}
            <p>{reaction.comment || 'No comment'}</p>
        </div>
    );
};

export default Comments;
