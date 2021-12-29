import "../../style/sass/styles.scss";
import Navbar from "../../components/Navbar";
import MdPhotoSizeSelectActual from "@meronex/icons/md/MdPhotoSizeSelectActual";
import BsCameraVideoFill from "@meronex/icons/bs/BsCameraVideoFill";
import AiFillLike from "@meronex/icons/ai/AiFillLike";
import FaComment from "@meronex/icons/fa/FaComment";
import FaShareAlt from "@meronex/icons/fa/FaShareAlt";
import AiFillCamera from "@meronex/icons/ai/AiFillCamera";
import MdInsertEmoticon from "@meronex/icons/md/MdInsertEmoticon";
import empty from "../../assets/icons/empty.png";
import { useEffect, useState } from "react";
import { like, readTimeline } from "../../api/posts";
import convertDate from "../../utils/convertDate";

import { config } from "../../config";
import {
  failLikePosts,
  failReadTimeline,
  successLikePosts,
  successReadTimeline,
} from "../../redux/actions/posts";
import { useDispatch, connect, useSelector } from "react-redux";
import CgMoreVerticalAlt from "@meronex/icons/cg/CgMoreVerticalAlt";
import {
  failFetchProfile,
  successFetchProfile,
} from "../../redux/actions/profile";
import { fetchProfile } from "../../api/profile";
import {
  failCreateComment,
  failDeleteComment,
  failLikeComment,
  successCreateComment,
  successDeleteComment,
  successLikeComment,
} from "../../redux/actions/comment";
import { createComment, deleteComment, likeComment } from "../../api/comment";

const Timeline = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [idPost, setIdPost] = useState("");
  const timelineSelector = useSelector((state) => state.posts);
  const profileSelector = useSelector((state) => state.profile);

  const [idComment, setIdComment] = useState("");

  let userId = localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : {};
  useEffect(() => {
    fetchProfile()
      .then((data) => dispatch(successFetchProfile(data)))
      .catch((err) => dispatch(failFetchProfile(err)));
    readTimeline()
      .then((res) => dispatch(successReadTimeline(res)))
      .catch((err) => dispatch(failReadTimeline(err)));
  }, [dispatch]);

  const handleComment = (id) => {
    if (!idPost) {
      setIdPost(id);
    } else {
      setIdPost("");
    }
  };

  const showBtnMore = (id) => {
    if (id === userId) {
      return "show-btn-more";
    } else {
      return "hide-btn-more";
    }
  };
  const handleSubmitComment = async (e) => {
    const commentData = new URLSearchParams();
    commentData.append("text", comment);
    e.preventDefault();
    await createComment(commentData, idPost)
      .then((res) => dispatch(successCreateComment(res)))
      .then(() =>
        readTimeline()
          .then((res) => dispatch(successReadTimeline(res)))
          .catch((err) => dispatch(failReadTimeline(err)))
      )
      .catch((err) => dispatch(failCreateComment(err)));
    setComment("");
  };

  const handleLike = (postId) => {
    like(postId)
      .then((res) => dispatch(successLikePosts(res)))
      .then(() =>
        readTimeline()
          .then((res) => dispatch(successReadTimeline(res)))
          .catch((err) => dispatch(failReadTimeline(err)))
      )
      .catch((err) => dispatch(failLikePosts(err)));
  };

  const actionColor = (postLike, userId) => {
    if (postLike && postLike.includes(userId)) {
      return "liked-btn";
    } else {
      return "unlike-btn";
    }
  };
  const handleLikeComment = (idPost) => {
    likeComment(idPost)
      .then((res) => dispatch(successLikeComment(res)))
      .then(() =>
        readTimeline()
          .then((res) => dispatch(successReadTimeline(res)))
          .catch((err) => dispatch(failReadTimeline(err)))
      )
      .catch((err) => dispatch(failLikeComment(err)));
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
      return "show-modal-more";
    } else {
      return "hide-modal-more";
    }
  };

  const handleDeleteComment = (idPost) => {
    deleteComment(idPost)
      .then((res) => dispatch(successDeleteComment(res)))
      .then(() =>
        readTimeline()
          .then((res) => dispatch(successReadTimeline(res)))
          .catch((err) => dispatch(failReadTimeline(err)))
      )
      .catch((err) => dispatch(failDeleteComment(err)));
  };
  return (
    <>
      <Navbar />
      <div className="container below-navbar">
        <div>
          {Object.keys(timelineSelector.posted).length === 0 ? (
            <div>
              <span className="text-14">No posts yet</span>
            </div>
          ) : (
            timelineSelector.posted.map((item, index) => {
              return (
                <div className="card-posted">
                  <div className="posted-header">
                    <img
                      src={empty}
                      alt="small profile pict"
                      className="profile-pict"
                    />
                    <div className="posted-name-date">
                      <span className="text-18-bold">
                        {item.user.first_name} {item.user.last_name}
                      </span>
                      <span className="text-11">
                        {convertDate(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="posted-content">
                    <span className="text-12">{item.text}</span>
                    <hr />
                    <div className="action-section">
                      <div
                        type="button"
                        className={`action-btn ${actionColor(
                          item.likes,
                          userId
                        )}`}
                        onClick={() => handleLike(item._id)}
                      >
                        <AiFillLike className="icon-20" />
                        <span className="text-14-bold">Like</span>
                      </div>
                      <div className="action-btn">
                        <FaComment className="icon-20" />
                        <span className="text-14-bold">Comment</span>
                      </div>
                      <div className="action-btn">
                        <FaShareAlt className="icon-20" />
                        <span className="text-14-bold">Share</span>
                      </div>
                    </div>
                    {/* additional */}

                    <div className="comment-section">
                      <span className="text-11">
                        {item.likes.length} Likes {item.comments.length}{" "}
                        Comments 0 Shares
                      </span>
                      <span className="text-11">Show All Comments</span>
                    </div>

                    {item.comments.map((com) => {
                      return (
                        <div className="comment-box">
                          <div className="comment-header">
                            <img
                              src={
                                com.user.picture
                                  ? `${config.api_host}/images/profiles/${com.user.picture}`
                                  : empty
                              }
                              alt="small profile pict"
                              className="comment-profile-pict"
                            />
                            <div className="comment-name-date">
                              <span className="text-13-bold">
                                {com.user.first_name} {com.user.last_name}
                              </span>
                              <span className="text-9">
                                {convertDate(com.createdAt)}
                              </span>
                            </div>
                            <div
                              className={`btn-more ${showBtnMore(
                                com.user._id
                              )}`}
                              onClick={() => handleMoreComment(com._id)}
                            >
                              <CgMoreVerticalAlt className="icon-20" />
                            </div>
                            <div
                              className={`modal-more-comment ${showMoreComment(
                                com._id
                              )}`}
                            >
                              <div
                                className="more-action"
                                onClick={() => {
                                  handleDeleteComment(com._id);
                                }}
                              >
                                <span className="text-14">Delete</span>
                              </div>
                            </div>
                          </div>

                          <div className="comment-content">
                            <span className="text-12">{com.text}</span>
                          </div>
                          <div className="comment-act-section">
                            <span
                              type="button"
                              onClick={() => handleLikeComment(com._id)}
                              className={`text-10-bold ${actionColor(
                                com.likes,
                                userId
                              )}`}
                            >
                              Like
                            </span>
                            <span className="text-10">
                              {com.likes.length} Likes{" "}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    <div className={`show-pop-comment`}>
                      <div className={`add-comment`}>
                        <img
                          src={
                            profileSelector.user.picture
                              ? `${config.api_host}/images/profiles/${profileSelector.user.picture}`
                              : empty
                          }
                          alt="small profile pict"
                          className="reply-profile-pict"
                        />
                        <form id="comment-form" onSubmit={handleSubmitComment}>
                          <textarea
                            onFocus={() => handleComment(item._id)}
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
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Timeline);
