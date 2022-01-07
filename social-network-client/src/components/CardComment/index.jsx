import "../../style/sass/styles.scss";
import { config } from "../../config";
import CgMoreVerticalAlt from "@meronex/icons/cg/CgMoreVerticalAlt";
import empty from "../../assets/icons/empty.png";
import convertDate from "../../utils/convertDate";
import { deleteComment, likeComment } from "../../api/comment";
import {
  failDeleteComment,
  failLikeComment,
  successDeleteComment,
  successLikeComment,
} from "../../redux/actions/comment";
import { useDispatch } from "react-redux";
import { useState } from "react";

const CardComment = ({ dataComment, userId, reloadPost }) => {
  const dispatch = useDispatch();
  const [idComment, setIdComment] = useState("");

  const showBtnMore = (id) => {
    if (id === userId) {
      return "show-btn-more";
    } else {
      return "hide-btn-more";
    }
  };
  const handleMoreComment = (id) => {
    if (!idComment) {
      setIdComment(id);
    } else {
      setIdComment("");
    }
  };
  const showMoreComment = (id) => {
    if (idComment === id) {
      return "show-modal";
    } else {
      return "hide-modal";
    }
  };
  const handleDeleteComment = async (id) => {
    await deleteComment(id)
      .then((res) => dispatch(successDeleteComment(res)))
      .then(() => reloadPost())
      .catch((err) => dispatch(failDeleteComment(err)));
  };
  const handleLikeComment = async (id) => {
    await likeComment(id)
      .then((res) => dispatch(successLikeComment(res)))
      .then(() => reloadPost())
      .catch((err) => dispatch(failLikeComment(err)));
  };
  const actionColor = (postLike, userId) => {
    if (postLike && postLike.includes(userId)) {
      return "liked-btn";
    } else {
      return "unlike-btn";
    }
  };

  return (
    <div className="comment-box">
      <div className="comment-header">
        <img
          src={
            dataComment.user.picture
              ? `${config.api_host}/images/profiles/${dataComment.user.picture}`
              : empty
          }
          alt="small profile pict"
          className="comment-profile-pict"
        />
        <div className="comment-name-date">
          <span className="text-13-bold">
            {dataComment.user.first_name} {dataComment.user.last_name}
          </span>

          <span className="text-9">{convertDate(dataComment.createdAt)}</span>
        </div>

        <div
          className={`btn-more ${showBtnMore(dataComment.user._id)}`}
          onClick={() => handleMoreComment(dataComment._id)}
        >
          <CgMoreVerticalAlt className="icon-20" />
        </div>

        <div
          className={`modal-more-comment ${showMoreComment(dataComment._id)}`}
        >
          <div
            className="more-action"
            onClick={() => {
              handleDeleteComment(dataComment._id);
            }}
          >
            <span className="text-14">Delete</span>
          </div>
        </div>
      </div>

      <div className="comment-content">
        <span className="text-12">{dataComment.text}</span>
      </div>
      <div className="comment-act-section">
        <span
          type="button"
          onClick={() => handleLikeComment(dataComment._id)}
          className={`text-10-bold ${actionColor(dataComment.likes, userId)}`}
        >
          Like
        </span>
        <span className="text-10">{dataComment.likes.length} Likes </span>
      </div>
    </div>
  );
};

export default CardComment;
