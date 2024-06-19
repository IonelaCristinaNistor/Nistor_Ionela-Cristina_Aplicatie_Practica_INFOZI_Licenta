import React from 'react';

const Comments = ({ reaction }) => {

    if (!reaction) {
        return null; 
    }

    return (
        <div>
            {reaction.name || 'Anonim'}
            <p>{reaction.comment || 'No comment'}</p>
        </div>
    );
};

export default Comments;
