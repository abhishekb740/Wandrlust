const CommentsModal = ({ postId, onClose }) => {
    const [comment, setComment] = useState("");

    const handleAddComment = () => {
        addComment(postId, comment);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                ></textarea>
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default CommentsModal;
