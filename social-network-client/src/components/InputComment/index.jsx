import {
  failCreateComment,
  successCreateComment,
} from "../../redux/actions/comment";
import "../../style/sass/styles.scss";
import { config } from "../../config";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createComment } from "../../api/comment";
import empty from "../../assets/icons/empty.png";

const InputComment = ({ dataUser, dataPost, reloadPost }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [idPost, setIdPost] = useState("");

  const handleSubmitComment = async (e) => {
    const commentData = new URLSearchParams();
    commentData.append("text", comment);
    e.preventDefault();
    await createComment(commentData, idPost)
      .then((res) => dispatch(successCreateComment(res)))
      .then(() => reloadPost())
      .catch((err) => dispatch(failCreateComment(err)));
    setComment("");
  };

  const handleGetIdPost = (id) => {
    setIdPost(id);
  };

  return (
    <div className={`show-pop-comment`}>
      <div className={`add-comment`}>
        <img
          src={
            dataUser.picture
              ? `${config.api_host}/images/profiles/${dataUser.picture}`
              : empty
          }
          alt="small profile pict"
          className="add-comment-profile-pict"
        />
        <form id="comment-form" onSubmit={handleSubmitComment}>
          <textarea
            onFocus={() => handleGetIdPost(dataPost._id)}
            name="text"
            id="text"
            placeholder="Add a comment"
            className="comment-input"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </form>
        <button type="submit" form="comment-form">
          Comment
        </button>
      </div>
    </div>
  );
};

export default InputComment;
