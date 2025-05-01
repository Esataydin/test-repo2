import React from "react";
import "../styles/Note.css"

function Post({ post, onDelete }) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            {/* <TODO>Doesn't work fix the p element down below</TODO> */}
            {/* <p className="note-content">{post.author__id}</p> */}
            <p className="note-content">{post.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(post.id)}>
                Delete
            </button>
        </div>
    );
}

export default Post