import "../../style/sass/styles.scss";

const ActionCount = ({ dataPost }) => {
  return (
    <div className="comment-section">
      <span className="text-11">
        {dataPost.likes.length} Likes {dataPost.comments.length} Comments 0
        Shares
      </span>
      <span className="text-11">Show All Comments</span>
    </div>
  );
};

export default ActionCount;
