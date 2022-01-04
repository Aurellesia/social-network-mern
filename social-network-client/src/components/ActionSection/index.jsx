import { like } from "../../api/posts";
import { failLikePosts, successLikePosts } from "../../redux/actions/posts";
import "../../style/sass/styles.scss";
import { useDispatch } from "react-redux";
import AiFillLike from "@meronex/icons/ai/AiFillLike";
import FaComment from "@meronex/icons/fa/FaComment";
import FaShareAlt from "@meronex/icons/fa/FaShareAlt";

const ActionSection = ({ dataPost, userId, reloadPost }) => {
  const dispatch = useDispatch();

  const actionColor = (postLike, userId) => {
    if (postLike?.includes(userId)) {
      return "liked-btn";
    } else {
      return "unlike-btn";
    }
  };

  const handleLikePost = async (postId) => {
    await like(postId)
      .then((res) => dispatch(successLikePosts(res)))
      .then(() => reloadPost())
      .catch((err) => dispatch(failLikePosts(err)));
  };

  return (
    <div className="action-section">
      <div
        type="button"
        className={`action-btn ${actionColor(dataPost.likes, userId)}`}
        onClick={() => handleLikePost(dataPost._id)}
      >
        <AiFillLike className="icon-20" />
        <span className="text-14-bold">Like</span>
      </div>

      <div type="button" className="action-btn">
        <FaComment className="icon-20" />
        <span className="text-14-bold">Comment</span>
      </div>
      <div className="action-btn">
        <FaShareAlt className="icon-20" />
        <span className="text-14-bold">Share</span>
      </div>
    </div>
  );
};

export default ActionSection;
